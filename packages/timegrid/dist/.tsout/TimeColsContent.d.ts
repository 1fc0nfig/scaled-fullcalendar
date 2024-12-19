import { CssDimValue } from '@fullcalendar/core';
import { BaseComponent, EventSegUiInteractionState, DateMarker, PositionCache, DateRange, DateProfile, DayTableCell } from '@fullcalendar/core/internal';
import { createElement, VNode } from '@fullcalendar/core/preact';
import { TimeColsSeg } from './TimeColsSeg.js';
import { TimeColsSlatsCoords } from './TimeColsSlatsCoords.js';
export interface TimeColsContentProps {
    axis: boolean;
    cells: DayTableCell[];
    dateProfile: DateProfile;
    nowDate: DateMarker;
    todayRange: DateRange;
    businessHourSegs: TimeColsSeg[];
    bgEventSegs: TimeColsSeg[];
    fgEventSegs: TimeColsSeg[];
    dateSelectionSegs: TimeColsSeg[];
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    nowIndicatorSegs: TimeColsSeg[];
    clientWidth: number | null;
    tableMinWidth: CssDimValue;
    tableColGroupNode: VNode;
    slatCoords: TimeColsSlatsCoords;
    onColCoords?: (colCoords: PositionCache) => void;
    forPrint: boolean;
}
export declare class TimeColsContent extends BaseComponent<TimeColsContentProps> {
    private splitFgEventSegs;
    private splitBgEventSegs;
    private splitBusinessHourSegs;
    private splitNowIndicatorSegs;
    private splitDateSelectionSegs;
    private splitEventDrag;
    private splitEventResize;
    private rootElRef;
    private cellElRefs;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updateCoords(): void;
}
//# sourceMappingURL=TimeColsContent.d.ts.map