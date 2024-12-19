import { EventSource } from '../structs/event-source.js';
import { CalendarContext } from '../CalendarContext.js';
import { EventSourceApi } from './EventSourceApi.js';
export declare class EventSourceImpl implements EventSourceApi {
    private context;
    internalEventSource: EventSource<any>;
    constructor(context: CalendarContext, internalEventSource: EventSource<any>);
    remove(): void;
    refetch(): void;
    get id(): string;
    get url(): string;
    get format(): string;
}
//# sourceMappingURL=EventSourceImpl.d.ts.map