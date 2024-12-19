import { CssDimValue } from '@fullcalendar/core';
import { EventSegUiInteractionState, DateComponent, PositionCache, DateRange, DateProfile, DayTableCell } from '@fullcalendar/core/internal';
import { VNode, createElement } from '@fullcalendar/core/preact';
import { TableSeg } from './TableSeg.js';
import { TableSegPlacement } from './event-placement.js';
export interface TableRowProps {
    cells: DayTableCell[];
    renderIntro?: () => VNode;
    businessHourSegs: TableSeg[];
    bgEventSegs: TableSeg[];
    fgEventSegs: TableSeg[];
    dateSelectionSegs: TableSeg[];
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    dayMaxEvents: boolean | number;
    dayMaxEventRows: boolean | number;
    clientWidth: number | null;
    clientHeight: number | null;
    dateProfile: DateProfile;
    todayRange: DateRange;
    showDayNumbers: boolean;
    showWeekNumbers: boolean;
    forPrint: boolean;
    cellMinHeight?: CssDimValue;
}
interface TableRowState {
    framePositions: PositionCache;
    maxContentHeight: number | null;
    segHeights: {
        [segUid: string]: number;
    };
}
export declare class TableRow extends DateComponent<TableRowProps, TableRowState> {
    private cellElRefs;
    private frameElRefs;
    private fgElRefs;
    private segHarnessRefs;
    private rootElRef;
    state: TableRowState;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TableRowProps, prevState: TableRowState): void;
    componentWillUnmount(): void;
    handleResize: (isForced: boolean) => void;
    getHighlightSegs(): TableSeg[];
    getMirrorSegs(): TableSeg[];
    renderFgSegs(col: number, segPlacements: TableSegPlacement[], todayRange: DateRange, isForcedInvisible: {
        [instanceId: string]: any;
    }, isDragging?: boolean, isResizing?: boolean, isDateSelecting?: boolean): VNode[];
    renderFillSegs(segs: TableSeg[], fillType: string): VNode;
    updateSizing(isExternalSizingChange: any): void;
    querySegHeights(): {
        [segUid: string]: number;
    };
    computeMaxContentHeight(): number;
    getCellEls(): HTMLTableCellElement[];
}
export {};
//# sourceMappingURL=TableRow.d.ts.map