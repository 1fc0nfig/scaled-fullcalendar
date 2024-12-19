import { createFormatter } from '../datelib/formatting.js';
import { createDuration } from '../datelib/duration.js';
import { parseDateSpan } from '../structs/date-span.js';
import { parseEventSource } from '../structs/event-source-parse.js';
import { parseEvent } from '../structs/event-parse.js';
import { eventTupleToStore } from '../structs/event-store.js';
import { getNow } from '../reducers/current-date.js';
import { triggerDateSelect, triggerDateUnselect } from '../calendar-utils.js';
import { hashValuesToArray } from '../util/object.js';
import { eventApiToStore, buildEventApis, EventImpl } from './EventImpl.js';
import { EventSourceImpl } from './EventSourceImpl.js';
export class CalendarImpl {
    getCurrentData() {
        return this.currentDataManager.getCurrentData();
    }
    dispatch(action) {
        this.currentDataManager.dispatch(action);
    }
    get view() { return this.getCurrentData().viewApi; }
    batchRendering(callback) {
        callback();
    }
    updateSize() {
        this.trigger('_resize', true);
    }
    // Options
    // -----------------------------------------------------------------------------------------------------------------
    setOption(name, val) {
        this.dispatch({
            type: 'SET_OPTION',
            optionName: name,
            rawOptionValue: val,
        });
    }
    getOption(name) {
        return this.currentDataManager.currentCalendarOptionsInput[name];
    }
    getAvailableLocaleCodes() {
        return Object.keys(this.getCurrentData().availableRawLocales);
    }
    // Trigger
    // -----------------------------------------------------------------------------------------------------------------
    on(handlerName, handler) {
        let { currentDataManager } = this;
        if (currentDataManager.currentCalendarOptionsRefiners[handlerName]) {
            currentDataManager.emitter.on(handlerName, handler);
        }
        else {
            console.warn(`Unknown listener name '${handlerName}'`);
        }
    }
    off(handlerName, handler) {
        this.currentDataManager.emitter.off(handlerName, handler);
    }
    // not meant for public use
    trigger(handlerName, ...args) {
        this.currentDataManager.emitter.trigger(handlerName, ...args);
    }
    // View
    // -----------------------------------------------------------------------------------------------------------------
    changeView(viewType, dateOrRange) {
        this.batchRendering(() => {
            this.unselect();
            if (dateOrRange) {
                if (dateOrRange.start && dateOrRange.end) { // a range
                    this.dispatch({
                        type: 'CHANGE_VIEW_TYPE',
                        viewType,
                    });
                    this.dispatch({
                        type: 'SET_OPTION',
                        optionName: 'visibleRange',
                        rawOptionValue: dateOrRange,
                    });
                }
                else {
                    let { dateEnv } = this.getCurrentData();
                    this.dispatch({
                        type: 'CHANGE_VIEW_TYPE',
                        viewType,
                        dateMarker: dateEnv.createMarker(dateOrRange),
                    });
                }
            }
            else {
                this.dispatch({
                    type: 'CHANGE_VIEW_TYPE',
                    viewType,
                });
            }
        });
    }
    // Forces navigation to a view for the given date.
    // `viewType` can be a specific view name or a generic one like "week" or "day".
    // needs to change
    zoomTo(dateMarker, viewType) {
        let state = this.getCurrentData();
        let spec;
        viewType = viewType || 'day'; // day is default zoom
        spec = state.viewSpecs[viewType] || this.getUnitViewSpec(viewType);
        this.unselect();
        if (spec) {
            this.dispatch({
                type: 'CHANGE_VIEW_TYPE',
                viewType: spec.type,
                dateMarker,
            });
        }
        else {
            this.dispatch({
                type: 'CHANGE_DATE',
                dateMarker,
            });
        }
    }
    // Given a duration singular unit, like "week" or "day", finds a matching view spec.
    // Preference is given to views that have corresponding buttons.
    getUnitViewSpec(unit) {
        let { viewSpecs, toolbarConfig } = this.getCurrentData();
        let viewTypes = [].concat(toolbarConfig.header ? toolbarConfig.header.viewsWithButtons : [], toolbarConfig.footer ? toolbarConfig.footer.viewsWithButtons : []);
        let i;
        let spec;
        for (let viewType in viewSpecs) {
            viewTypes.push(viewType);
        }
        for (i = 0; i < viewTypes.length; i += 1) {
            spec = viewSpecs[viewTypes[i]];
            if (spec) {
                if (spec.singleUnit === unit) {
                    return spec;
                }
            }
        }
        return null;
    }
    // Current Date
    // -----------------------------------------------------------------------------------------------------------------
    prev() {
        this.unselect();
        this.dispatch({ type: 'PREV' });
    }
    next() {
        this.unselect();
        this.dispatch({ type: 'NEXT' });
    }
    prevYear() {
        let state = this.getCurrentData();
        this.unselect();
        this.dispatch({
            type: 'CHANGE_DATE',
            dateMarker: state.dateEnv.addYears(state.currentDate, -1),
        });
    }
    nextYear() {
        let state = this.getCurrentData();
        this.unselect();
        this.dispatch({
            type: 'CHANGE_DATE',
            dateMarker: state.dateEnv.addYears(state.currentDate, 1),
        });
    }
    today() {
        let state = this.getCurrentData();
        this.unselect();
        this.dispatch({
            type: 'CHANGE_DATE',
            dateMarker: getNow(state.calendarOptions.now, state.dateEnv),
        });
    }
    gotoDate(zonedDateInput) {
        let state = this.getCurrentData();
        this.unselect();
        this.dispatch({
            type: 'CHANGE_DATE',
            dateMarker: state.dateEnv.createMarker(zonedDateInput),
        });
    }
    incrementDate(deltaInput) {
        let state = this.getCurrentData();
        let delta = createDuration(deltaInput);
        if (delta) { // else, warn about invalid input?
            this.unselect();
            this.dispatch({
                type: 'CHANGE_DATE',
                dateMarker: state.dateEnv.add(state.currentDate, delta),
            });
        }
    }
    getDate() {
        let state = this.getCurrentData();
        return state.dateEnv.toDate(state.currentDate);
    }
    // Date Formatting Utils
    // -----------------------------------------------------------------------------------------------------------------
    formatDate(d, formatter) {
        let { dateEnv } = this.getCurrentData();
        return dateEnv.format(dateEnv.createMarker(d), createFormatter(formatter));
    }
    // `settings` is for formatter AND isEndExclusive
    formatRange(d0, d1, settings) {
        let { dateEnv } = this.getCurrentData();
        return dateEnv.formatRange(dateEnv.createMarker(d0), dateEnv.createMarker(d1), createFormatter(settings), settings);
    }
    formatIso(d, omitTime) {
        let { dateEnv } = this.getCurrentData();
        return dateEnv.formatIso(dateEnv.createMarker(d), { omitTime });
    }
    // Date Selection / Event Selection / DayClick
    // -----------------------------------------------------------------------------------------------------------------
    select(dateOrObj, endDate) {
        let selectionInput;
        if (endDate == null) {
            if (dateOrObj.start != null) {
                selectionInput = dateOrObj;
            }
            else {
                selectionInput = {
                    start: dateOrObj,
                    end: null,
                };
            }
        }
        else {
            selectionInput = {
                start: dateOrObj,
                end: endDate,
            };
        }
        let state = this.getCurrentData();
        let selection = parseDateSpan(selectionInput, state.dateEnv, createDuration({ days: 1 }));
        if (selection) { // throw parse error otherwise?
            this.dispatch({ type: 'SELECT_DATES', selection });
            triggerDateSelect(selection, null, state);
        }
    }
    unselect(pev) {
        let state = this.getCurrentData();
        if (state.dateSelection) {
            this.dispatch({ type: 'UNSELECT_DATES' });
            triggerDateUnselect(pev, state);
        }
    }
    // Public Events API
    // -----------------------------------------------------------------------------------------------------------------
    addEvent(eventInput, sourceInput) {
        if (eventInput instanceof EventImpl) {
            let def = eventInput._def;
            let instance = eventInput._instance;
            let currentData = this.getCurrentData();
            // not already present? don't want to add an old snapshot
            if (!currentData.eventStore.defs[def.defId]) {
                this.dispatch({
                    type: 'ADD_EVENTS',
                    eventStore: eventTupleToStore({ def, instance }), // TODO: better util for two args?
                });
                this.triggerEventAdd(eventInput);
            }
            return eventInput;
        }
        let state = this.getCurrentData();
        let eventSource;
        if (sourceInput instanceof EventSourceImpl) {
            eventSource = sourceInput.internalEventSource;
        }
        else if (typeof sourceInput === 'boolean') {
            if (sourceInput) { // true. part of the first event source
                [eventSource] = hashValuesToArray(state.eventSources);
            }
        }
        else if (sourceInput != null) { // an ID. accepts a number too
            let sourceApi = this.getEventSourceById(sourceInput); // TODO: use an internal function
            if (!sourceApi) {
                console.warn(`Could not find an event source with ID "${sourceInput}"`); // TODO: test
                return null;
            }
            eventSource = sourceApi.internalEventSource;
        }
        let tuple = parseEvent(eventInput, eventSource, state, false);
        if (tuple) {
            let newEventApi = new EventImpl(state, tuple.def, tuple.def.recurringDef ? null : tuple.instance);
            this.dispatch({
                type: 'ADD_EVENTS',
                eventStore: eventTupleToStore(tuple),
            });
            this.triggerEventAdd(newEventApi);
            return newEventApi;
        }
        return null;
    }
    triggerEventAdd(eventApi) {
        let { emitter } = this.getCurrentData();
        emitter.trigger('eventAdd', {
            event: eventApi,
            relatedEvents: [],
            revert: () => {
                this.dispatch({
                    type: 'REMOVE_EVENTS',
                    eventStore: eventApiToStore(eventApi),
                });
            },
        });
    }
    // TODO: optimize
    getEventById(id) {
        let state = this.getCurrentData();
        let { defs, instances } = state.eventStore;
        id = String(id);
        for (let defId in defs) {
            let def = defs[defId];
            if (def.publicId === id) {
                if (def.recurringDef) {
                    return new EventImpl(state, def, null);
                }
                for (let instanceId in instances) {
                    let instance = instances[instanceId];
                    if (instance.defId === def.defId) {
                        return new EventImpl(state, def, instance);
                    }
                }
            }
        }
        return null;
    }
    getEvents() {
        let currentData = this.getCurrentData();
        return buildEventApis(currentData.eventStore, currentData);
    }
    removeAllEvents() {
        this.dispatch({ type: 'REMOVE_ALL_EVENTS' });
    }
    // Public Event Sources API
    // -----------------------------------------------------------------------------------------------------------------
    getEventSources() {
        let state = this.getCurrentData();
        let sourceHash = state.eventSources;
        let sourceApis = [];
        for (let internalId in sourceHash) {
            sourceApis.push(new EventSourceImpl(state, sourceHash[internalId]));
        }
        return sourceApis;
    }
    getEventSourceById(id) {
        let state = this.getCurrentData();
        let sourceHash = state.eventSources;
        id = String(id);
        for (let sourceId in sourceHash) {
            if (sourceHash[sourceId].publicId === id) {
                return new EventSourceImpl(state, sourceHash[sourceId]);
            }
        }
        return null;
    }
    addEventSource(sourceInput) {
        let state = this.getCurrentData();
        if (sourceInput instanceof EventSourceImpl) {
            // not already present? don't want to add an old snapshot
            if (!state.eventSources[sourceInput.internalEventSource.sourceId]) {
                this.dispatch({
                    type: 'ADD_EVENT_SOURCES',
                    sources: [sourceInput.internalEventSource],
                });
            }
            return sourceInput;
        }
        let eventSource = parseEventSource(sourceInput, state);
        if (eventSource) { // TODO: error otherwise?
            this.dispatch({ type: 'ADD_EVENT_SOURCES', sources: [eventSource] });
            return new EventSourceImpl(state, eventSource);
        }
        return null;
    }
    removeAllEventSources() {
        this.dispatch({ type: 'REMOVE_ALL_EVENT_SOURCES' });
    }
    refetchEvents() {
        this.dispatch({ type: 'FETCH_EVENT_SOURCES', isRefetch: true });
    }
    // Scroll
    // -----------------------------------------------------------------------------------------------------------------
    scrollToTime(timeInput) {
        let time = createDuration(timeInput);
        if (time) {
            this.trigger('_scrollRequest', { time });
        }
    }
}
//# sourceMappingURL=CalendarImpl.js.map