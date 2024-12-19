import { BaseComponent, DateMarker, DateRange } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
export interface ListViewHeaderRowProps {
    cellId: string;
    dayDate: DateMarker;
    todayRange: DateRange;
}
export declare class ListViewHeaderRow extends BaseComponent<ListViewHeaderRowProps> {
    state: {
        textId: string;
    };
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=ListViewHeaderRow.d.ts.map