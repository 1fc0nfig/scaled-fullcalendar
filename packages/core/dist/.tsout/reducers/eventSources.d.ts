import { EventSourceHash } from '../structs/event-source.js';
import { DateProfile } from '../DateProfileGenerator.js';
import { Action } from './Action.js';
import { CalendarContext } from '../CalendarContext.js';
export declare function initEventSources(calendarOptions: any, dateProfile: DateProfile, context: CalendarContext): EventSourceHash;
export declare function reduceEventSources(eventSources: EventSourceHash, action: Action, dateProfile: DateProfile, context: CalendarContext): EventSourceHash;
export declare function reduceEventSourcesNewTimeZone(eventSources: EventSourceHash, dateProfile: DateProfile, context: CalendarContext): EventSourceHash;
export declare function computeEventSourcesLoading(eventSources: EventSourceHash): boolean;
//# sourceMappingURL=eventSources.d.ts.map