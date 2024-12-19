import { createPlugin } from '../plugin-system.js';
import { buildRangeApiWithTimeZone } from '../structs/date-span.js';
import { unpromisify } from '../util/promise.js';
let eventSourceDef = {
    parseMeta(refined) {
        if (typeof refined.events === 'function') {
            return refined.events;
        }
        return null;
    },
    fetch(arg, successCallback, errorCallback) {
        const { dateEnv } = arg.context;
        const func = arg.eventSource.meta;
        unpromisify(func.bind(null, buildRangeApiWithTimeZone(arg.range, dateEnv)), (rawEvents) => successCallback({ rawEvents }), errorCallback);
    },
};
export const funcEventSourcePlugin = createPlugin({
    name: 'func-event-source',
    eventSourceDefs: [eventSourceDef],
});
//# sourceMappingURL=func-event-source.js.map