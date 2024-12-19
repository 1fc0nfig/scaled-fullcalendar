import { Duration } from '../datelib/duration.js';
import { EventStore } from './event-store.js';
import { EventDef } from './event-def.js';
import { EventUiHash } from '../component/event-ui.js';
import { CalendarContext } from '../CalendarContext.js';
export interface EventMutation {
    datesDelta?: Duration;
    startDelta?: Duration;
    endDelta?: Duration;
    standardProps?: any;
    extendedProps?: any;
}
export declare function applyMutationToEventStore(eventStore: EventStore, eventConfigBase: EventUiHash, mutation: EventMutation, context: CalendarContext): EventStore;
export type eventDefMutationApplier = (eventDef: EventDef, mutation: EventMutation, context: CalendarContext) => void;
//# sourceMappingURL=event-mutation.d.ts.map