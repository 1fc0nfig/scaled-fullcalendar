import { EventDef, EventDefHash } from './event-def.js';
import { EventInstanceHash } from './event-instance.js';
import { EventInput, EventTuple } from './event-parse.js';
import { CalendarContext } from '../CalendarContext.js';
import { EventSource } from './event-source.js';
import { EventDefIdMap, EventInstanceIdMap } from '../reducers/eventStore.js';
export interface EventStore {
    defs: EventDefHash;
    instances: EventInstanceHash;
}
export declare function parseEvents(rawEvents: EventInput[], eventSource: EventSource<any> | null, context: CalendarContext, allowOpenRange?: boolean, defIdMap?: EventDefIdMap, instanceIdMap?: EventInstanceIdMap): EventStore;
export declare function eventTupleToStore(tuple: EventTuple, eventStore?: EventStore): EventStore;
export declare function getRelevantEvents(eventStore: EventStore, instanceId: string): EventStore;
export declare function createEmptyEventStore(): EventStore;
export declare function mergeEventStores(store0: EventStore, store1: EventStore): EventStore;
export declare function filterEventStoreDefs(eventStore: EventStore, filterFunc: (eventDef: EventDef) => boolean): EventStore;
export declare function excludeSubEventStore(master: EventStore, sub: EventStore): EventStore;
//# sourceMappingURL=event-store.d.ts.map