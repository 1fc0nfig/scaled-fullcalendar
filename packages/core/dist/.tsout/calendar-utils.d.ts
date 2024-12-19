import { PointerDragEvent } from './interactions/pointer.js';
import { DateSpanApi, DatePointApi, DateSpan } from './structs/date-span.js';
import { CalendarContext } from './CalendarContext.js';
import { ViewApi } from './api/ViewApi.js';
import { ViewImpl } from './api/ViewImpl.js';
import { DateMarker } from './datelib/marker.js';
export interface DateClickApi extends DatePointApi {
    dayEl: HTMLElement;
    jsEvent: UIEvent;
    view: ViewApi;
}
export interface DateSelectionApi extends DateSpanApi {
    jsEvent: UIEvent;
    view: ViewApi;
}
export type DatePointTransform = (dateSpan: DateSpan, context: CalendarContext) => any;
export type DateSpanTransform = (dateSpan: DateSpan, context: CalendarContext) => any;
export type CalendarInteraction = {
    destroy: () => void;
};
export type CalendarInteractionClass = {
    new (context: CalendarContext): CalendarInteraction;
};
export type OptionChangeHandler = (propValue: any, context: CalendarContext) => void;
export type OptionChangeHandlerMap = {
    [propName: string]: OptionChangeHandler;
};
export interface DateSelectArg extends DateSpanApi {
    jsEvent: MouseEvent | null;
    view: ViewApi;
}
export declare function triggerDateSelect(selection: DateSpan, pev: PointerDragEvent | null, context: CalendarContext & {
    viewApi?: ViewImpl;
}): void;
export interface DateUnselectArg {
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare function triggerDateUnselect(pev: PointerDragEvent | null, context: CalendarContext & {
    viewApi?: ViewImpl;
}): void;
export declare function buildDateSpanApiWithContext(dateSpan: DateSpan, context: CalendarContext): DateSpanApi;
export declare function getDefaultEventEnd(allDay: boolean, marker: DateMarker, context: CalendarContext): DateMarker;
//# sourceMappingURL=calendar-utils.d.ts.map