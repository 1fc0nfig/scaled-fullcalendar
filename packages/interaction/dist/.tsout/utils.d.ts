import { ViewApi, EventApi, DatePointApi } from '@fullcalendar/core';
import { DateSpan, CalendarContext, DateEnv } from '@fullcalendar/core/internal';
export interface DropArg extends DatePointApi {
    draggedEl: HTMLElement;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export type EventReceiveArg = EventReceiveLeaveArg;
export type EventLeaveArg = EventReceiveLeaveArg;
export interface EventReceiveLeaveArg {
    draggedEl: HTMLElement;
    event: EventApi;
    relatedEvents: EventApi[];
    revert: () => void;
    view: ViewApi;
}
export declare function buildDatePointApiWithContext(dateSpan: DateSpan, context: CalendarContext): DatePointApi;
export declare function buildDatePointApi(span: DateSpan, dateEnv: DateEnv): DatePointApi;
//# sourceMappingURL=utils.d.ts.map