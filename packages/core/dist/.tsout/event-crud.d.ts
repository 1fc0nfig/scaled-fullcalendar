import { EventStore } from './structs/event-store.js';
import { CalendarData } from './reducers/data-types.js';
import { EventImpl } from './api/EventImpl.js';
import { Duration } from './datelib/duration.js';
import { ViewApi } from './index.js';
export interface EventAddArg {
    event: EventImpl;
    relatedEvents: EventImpl[];
    revert: () => void;
}
export interface EventChangeArg {
    oldEvent: EventImpl;
    event: EventImpl;
    relatedEvents: EventImpl[];
    revert: () => void;
}
export interface EventDropArg extends EventChangeArg {
    el: HTMLElement;
    delta: Duration;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export interface EventRemoveArg {
    event: EventImpl;
    relatedEvents: EventImpl[];
    revert: () => void;
}
export declare function handleEventStore(eventStore: EventStore, context: CalendarData): void;
//# sourceMappingURL=event-crud.d.ts.map