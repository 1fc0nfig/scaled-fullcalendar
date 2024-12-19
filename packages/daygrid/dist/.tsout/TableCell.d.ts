import { CssDimValue } from '@fullcalendar/core';
import { DateMarker, DateComponent, DateRange, DateProfile, Dictionary, EventSegUiInteractionState } from '@fullcalendar/core/internal';
import { Ref, ComponentChildren, createElement } from '@fullcalendar/core/preact';
import { TableSegPlacement } from './event-placement.js';
export interface TableCellProps {
    elRef?: Ref<HTMLTableCellElement>;
    date: DateMarker;
    dateProfile: DateProfile;
    extraRenderProps?: Dictionary;
    extraDataAttrs?: Dictionary;
    extraClassNames?: string[];
    extraDateSpan?: Dictionary;
    innerElRef?: Ref<HTMLDivElement>;
    bgContent: ComponentChildren;
    fgContentElRef?: Ref<HTMLDivElement>;
    fgContent: ComponentChildren;
    moreCnt: number;
    moreMarginTop: number;
    showDayNumber: boolean;
    showWeekNumber: boolean;
    forceDayTop: boolean;
    todayRange: DateRange;
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    singlePlacements: TableSegPlacement[];
    minHeight?: CssDimValue;
}
export declare class TableCell extends DateComponent<TableCellProps> {
    private rootElRef;
    state: {
        dayNumberId: string;
    };
    render(): createElement.JSX.Element;
    handleRootEl: (el: HTMLElement) => void;
}
//# sourceMappingURL=TableCell.d.ts.map