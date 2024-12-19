import { Calendar } from '@fullcalendar/core';
import { createPlugin } from '@fullcalendar/core';
import { parseLocalDate, parseUtcDate } from './date-parsing.js';
// Other Important Global Stuff
// ---------------------------------------------------------------------------------------------------------------------
import './hacks.js';
import './simulate.js';
import './date-matchers.js';
// Setup / Teardown
// ---------------------------------------------------------------------------------------------------------------------
let optionsStack = null;
beforeEach(() => {
    optionsStack = [];
});
afterEach(() => {
    optionsStack = null;
    if (window.currentCalendar) {
        window.currentCalendar.destroy();
        window.currentCalendar = null;
    }
    $('#calendar').remove();
});
// Calendar Options and Initialization
// ---------------------------------------------------------------------------------------------------------------------
function pushOptions(options) {
    beforeEach(() => {
        optionsStack.push(options);
    });
}
// called within an `it`
// needs to be called *before* initCalendar
function spyOnCalendarCallback(name, func) {
    let options = {};
    options[name] = func || (() => { });
    spyOn(options, name).and.callThrough();
    optionsStack.push(options);
    return options[name];
}
function initCalendar(moreOptions, el) {
    let $el;
    if (moreOptions) {
        optionsStack.push(moreOptions);
    }
    if (el) {
        $el = $(el);
    }
    else {
        $el = $('<div id="calendar">').appendTo('body');
    }
    if (window.currentCalendar) {
        window.currentCalendar.destroy();
    }
    let options = getCurrentOptions();
    let newCalendar = null;
    options.plugins = options.plugins.concat([
        createPlugin({
            name: 'current-calendar-' + Date.now(),
            contextInit(context) {
                newCalendar = window.currentCalendar = context.calendarApi;
            },
        }),
    ]);
    let cool = new Calendar($el[0], options);
    if (newCalendar === window.currentCalendar) {
        newCalendar.render();
    }
    else {
        newCalendar.destroy();
    }
    return cool;
}
function getCurrentOptions() {
    let args = [{}].concat(optionsStack);
    return $.extend.apply($, args); // eslint-disable-line prefer-spread
}
// Categorizing Tests
// ---------------------------------------------------------------------------------------------------------------------
/*
describeOptions(optionName, descriptionAndValueHash, callback)
describeOptions(descriptionAndOptionsHash, callback)
 */
function describeOptions(optName, hash, callback) {
    if ($.type(optName) === 'object') {
        callback = hash;
        hash = optName;
        optName = null;
    }
    $.each(hash, (desc, val) => {
        let opts;
        if (optName) {
            opts = {};
            opts[optName] = val;
        }
        else {
            opts = val;
        }
        opts = $.extend(true, {}, opts);
        describe(desc, () => {
            pushOptions(opts);
            callback(val);
        });
    });
}
function describeValues(hash, callback) {
    $.each(hash, 
    /**
     * @param desc {string}
     */
    (desc, val) => {
        describe(desc, () => {
            callback(val);
        });
    });
}
// Timezone Tests (needed?)
// ---------------------------------------------------------------------------------------------------------------------
const timeZoneScenarios = {
    local: {
        description: 'when local timezone',
        value: 'local',
        parseDate: parseLocalDate,
    },
    UTC: {
        description: 'when UTC timezone',
        value: 'UTC',
        parseDate: parseUtcDate,
    },
};
function describeTimeZones(callback) {
    $.each(timeZoneScenarios, (name, scenario) => {
        describe(scenario.description, () => {
            pushOptions({
                timeZone: name,
            });
            callback(scenario);
        });
    });
}
function describeTimeZone(name, callback) {
    let scenario = timeZoneScenarios[name];
    describe(scenario.description, () => {
        pushOptions({
            timeZone: name,
        });
        callback(scenario);
    });
}
// Misc
// ---------------------------------------------------------------------------------------------------------------------
function oneCall(func) {
    let called;
    called = false;
    return function () {
        if (!called) {
            called = true;
            return func.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return null;
    };
}
function spyOnMethod(Class, methodName, dontCallThrough) {
    let origMethod = Class.prototype.hasOwnProperty(methodName) // eslint-disable-line no-prototype-builtins
        ? Class.prototype[methodName]
        : null;
    let spy = spyOn(Class.prototype, methodName);
    if (!dontCallThrough) {
        spy = spy.and.callThrough();
    }
    spy.restore = () => {
        if (origMethod) {
            Class.prototype[methodName] = origMethod;
        }
        else {
            delete Class.prototype[methodName];
        }
    };
    return spy;
}
// wraps an existing function in a spy, calling through to the function
function spyCall(func) {
    func = func || (() => { });
    const obj = { func };
    spyOn(obj, 'func').and.callThrough();
    return obj.func;
}
Object.assign(window, {
    spyOnCalendarCallback,
    pushOptions,
    initCalendar,
    getCurrentOptions,
    describeOptions,
    describeValues,
    describeTimeZones,
    describeTimeZone,
    oneCall,
    spyOnMethod,
    spyCall,
});
pushOptions({
    timeZone: 'UTC',
    eventDisplay: 'auto',
});
//# sourceMappingURL=global-utils.js.map