import { EventSegUiInteractionState, DateComponent, DateProfile, Hit, DayTableCell } from '@fullcalendar/core/internal';
import { VNode, createElement } from '@fullcalendar/core/preact';
import { TableSeg } from './TableSeg.js';
export interface TableRowsProps {
    dateProfile: DateProfile;
    cells: DayTableCell[][];
    renderRowIntro?: () => VNode;
    showWeekNumbers: boolean;
    clientWidth: number | null;
    clientHeight: number | null;
    businessHourSegs: TableSeg[];
    bgEventSegs: TableSeg[];
    fgEventSegs: TableSeg[];
    dateSelectionSegs: TableSeg[];
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    dayMaxEvents: boolean | number;
    dayMaxEventRows: boolean | number;
    forPrint: boolean;
    isHitComboAllowed?: (hit0: Hit, hit1: Hit) => boolean;
}
export declare class TableRows extends DateComponent<TableRowsProps> {
    private splitBusinessHourSegs;
    private splitBgEventSegs;
    private splitFgEventSegs;
    private splitDateSelectionSegs;
    private splitEventDrag;
    private splitEventResize;
    private rootEl;
    private rowRefs;
    private rowPositions;
    private colPositions;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    registerInteractiveComponent(): void;
    componentWillUnmount(): void;
    prepareHits(): void;
    queryHit(positionLeft: number, positionTop: number): Hit;
    private getCellEl;
    private getCellRange;
}
//# sourceMappingURL=TableRows.d.ts.map