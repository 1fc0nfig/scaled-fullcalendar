import { EventInstanceHash } from '../structs/event-instance.js';
import { EventStore } from '../structs/event-store.js';
import { Action } from './Action.js';
import { EventSourceHash } from '../structs/event-source.js';
import { DateProfile } from '../DateProfileGenerator.js';
import { DateEnv } from '../datelib/env.js';
import { CalendarContext } from '../CalendarContext.js';
export declare function reduceEventStore(eventStore: EventStore, action: Action, eventSources: EventSourceHash, dateProfile: DateProfile, context: CalendarContext): EventStore;
export declare function rezoneEventStoreDates(eventStore: EventStore, oldDateEnv: DateEnv, newDateEnv: DateEnv): EventStore;
export declare function excludeInstances(eventStore: EventStore, removals: EventInstanceHash): EventStore;
export type EventDefIdMap = {
    [publicId: string]: string;
};
export type EventInstanceIdMap = {
    [publicId: string]: string;
};
//# sourceMappingURL=eventStore.d.ts.map