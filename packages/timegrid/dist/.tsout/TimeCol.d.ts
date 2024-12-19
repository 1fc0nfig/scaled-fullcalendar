import { DateMarker, BaseComponent, EventSegUiInteractionState, DateRange, DateProfile, sortEventSegs, SegEntryGroup, Dictionary } from '@fullcalendar/core/internal';
import { createElement, Ref } from '@fullcalendar/core/preact';
import { TimeColsSeg } from './TimeColsSeg.js';
import { TimeColsSlatsCoords } from './TimeColsSlatsCoords.js';
import { SegWebRect } from './seg-web.js';
export interface TimeColProps {
    elRef?: Ref<HTMLTableCellElement>;
    dateProfile: DateProfile;
    date: DateMarker;
    nowDate: DateMarker;
    todayRange: DateRange;
    extraDataAttrs?: any;
    extraRenderProps?: any;
    extraClassNames?: string[];
    extraDateSpan?: Dictionary;
    fgEventSegs: TimeColsSeg[];
    bgEventSegs: TimeColsSeg[];
    businessHourSegs: TimeColsSeg[];
    nowIndicatorSegs: TimeColsSeg[];
    dateSelectionSegs: TimeColsSeg[];
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    slatCoords: TimeColsSlatsCoords;
    forPrint: boolean;
}
export declare class TimeCol extends BaseComponent<TimeColProps> {
    sortEventSegs: typeof sortEventSegs;
    render(): createElement.JSX.Element;
    renderFgSegs(sortedFgSegs: TimeColsSeg[], segIsInvisible: {
        [instanceId: string]: any;
    }, isDragging: boolean, isResizing: boolean, isDateSelecting: boolean, forcedKey?: string): createElement.JSX.Element;
    renderPositionedFgSegs(segs: TimeColsSeg[], // if not mirror, needs to be sorted
    segIsInvisible: {
        [instanceId: string]: any;
    }, isDragging: boolean, isResizing: boolean, isDateSelecting: boolean, forcedKey?: string): createElement.JSX.Element;
    renderHiddenGroups(hiddenGroups: SegEntryGroup[], segs: TimeColsSeg[]): createElement.JSX.Element;
    renderFillSegs(segs: TimeColsSeg[], fillType: string): createElement.JSX.Element;
    renderNowIndicator(segs: TimeColsSeg[]): createElement.JSX.Element[];
    computeSegHStyle(segHCoords: SegWebRect): {
        zIndex: number;
        left: string;
        right: string;
    };
}
export declare function renderPlainFgSegs(sortedFgSegs: TimeColsSeg[], { todayRange, nowDate, eventSelection, eventDrag, eventResize }: {
    todayRange: DateRange;
    nowDate: DateMarker;
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
}): createElement.JSX.Element;
//# sourceMappingURL=TimeCol.d.ts.map