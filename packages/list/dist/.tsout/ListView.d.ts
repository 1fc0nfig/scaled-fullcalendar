import { ViewApi, EventRenderRange } from '@fullcalendar/core';
import { ViewProps, DateMarker, DateRange, EventUiHash, EventStore, Seg, DateComponent, MountArg } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
export interface NoEventsContentArg {
    text: string;
    view: ViewApi;
}
export type NoEventsMountArg = MountArg<NoEventsContentArg>;
export declare class ListView extends DateComponent<ViewProps> {
    private computeDateVars;
    private eventStoreToSegs;
    state: {
        timeHeaderId: string;
        eventHeaderId: string;
        dateHeaderIdRoot: string;
    };
    render(): createElement.JSX.Element;
    setRootEl: (rootEl: HTMLElement | null) => void;
    renderEmptyMessage(): createElement.JSX.Element;
    renderSegList(allSegs: Seg[], dayDates: DateMarker[]): createElement.JSX.Element;
    _eventStoreToSegs(eventStore: EventStore, eventUiBases: EventUiHash, dayRanges: DateRange[]): Seg[];
    eventRangesToSegs(eventRanges: EventRenderRange[], dayRanges: DateRange[]): any[];
    eventRangeToSegs(eventRange: EventRenderRange, dayRanges: DateRange[]): any[];
}
//# sourceMappingURL=ListView.d.ts.map