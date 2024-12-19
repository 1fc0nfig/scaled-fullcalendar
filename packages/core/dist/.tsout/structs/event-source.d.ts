import { EventInput, EventInputTransformer } from './event-parse.js';
import { DateRange } from '../datelib/date-range.js';
import { EventUi } from '../component/event-ui.js';
import { CalendarContext } from '../CalendarContext.js';
import { CalendarImpl } from '../api/CalendarImpl.js';
import { Dictionary } from '../options.js';
export type EventSourceSuccessResponseHandler = (this: CalendarImpl, rawData: any, response: any) => EventInput[] | void;
export type EventSourceErrorResponseHandler = (error: Error) => void;
export interface EventSource<Meta> {
    _raw: any;
    sourceId: string;
    sourceDefId: number;
    meta: Meta;
    publicId: string;
    isFetching: boolean;
    latestFetchId: string;
    fetchRange: DateRange | null;
    defaultAllDay: boolean | null;
    eventDataTransform: EventInputTransformer;
    ui: EventUi;
    success: EventSourceSuccessResponseHandler | null;
    failure: EventSourceErrorResponseHandler | null;
    extendedProps: Dictionary;
}
export type EventSourceHash = {
    [sourceId: string]: EventSource<any>;
};
export interface EventSourceFetcherRes {
    rawEvents: EventInput[];
    response?: Response;
}
export type EventSourceFetcher<Meta> = (arg: {
    eventSource: EventSource<Meta>;
    range: DateRange;
    isRefetch: boolean;
    context: CalendarContext;
}, successCallback: (res: EventSourceFetcherRes) => void, errorCallback: (error: Error) => void) => void;
//# sourceMappingURL=event-source.d.ts.map