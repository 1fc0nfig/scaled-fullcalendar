import { BaseComponent, DateMarker, Dictionary, DateProfile, DateRange, EventSegUiInteractionState } from '@fullcalendar/core/internal';
import { createElement, RefObject } from '@fullcalendar/core/preact';
import { TableSegPlacement } from './event-placement.js';
import { TableSeg } from './TableSeg.js';
export interface TableCellMoreLinkProps {
    allDayDate: DateMarker;
    singlePlacements: TableSegPlacement[];
    moreCnt: number;
    alignmentElRef: RefObject<HTMLElement>;
    alignGridTop: boolean;
    extraDateSpan?: Dictionary;
    dateProfile: DateProfile;
    todayRange: DateRange;
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
}
export declare class TableCellMoreLink extends BaseComponent<TableCellMoreLinkProps> {
    compileSegs: (singlePlacements: TableSegPlacement[]) => {
        allSegs: TableSeg[];
        invisibleSegs: TableSeg[];
    };
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TableCellMoreLink.d.ts.map