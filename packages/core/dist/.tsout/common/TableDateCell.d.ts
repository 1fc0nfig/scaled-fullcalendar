import { DateRange } from '../datelib/date-range.js';
import { DateMarker } from '../datelib/marker.js';
import { createElement } from '../preact.js';
import { DateFormatter } from '../datelib/DateFormatter.js';
import { BaseComponent } from '../vdom-util.js';
import { DateProfile } from '../DateProfileGenerator.js';
import { Dictionary } from '../options.js';
export interface TableDateCellProps {
    date: DateMarker;
    dateProfile: DateProfile;
    todayRange: DateRange;
    colCnt: number;
    dayHeaderFormat: DateFormatter;
    colSpan?: number;
    isSticky?: boolean;
    extraDataAttrs?: Dictionary;
    extraRenderProps?: Dictionary;
}
export declare class TableDateCell extends BaseComponent<TableDateCellProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TableDateCell.d.ts.map