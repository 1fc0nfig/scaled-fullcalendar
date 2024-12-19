import { EventSourceDef } from '@fullcalendar/core/internal';
import { IcalExpander } from './ical-expander/IcalExpander.js';
interface ICalFeedMeta {
    url: string;
    format: 'ics';
    internalState?: InternalState;
}
interface InternalState {
    iCalExpanderPromise: Promise<IcalExpander>;
    response: Response | null;
}
export declare const eventSourceDef: EventSourceDef<ICalFeedMeta>;
export {};
//# sourceMappingURL=event-source-def.d.ts.map