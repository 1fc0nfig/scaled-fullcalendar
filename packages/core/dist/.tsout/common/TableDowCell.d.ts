import { createElement } from '../preact.js';
import { DateFormatter } from '../datelib/DateFormatter.js';
import { BaseComponent } from '../vdom-util.js';
import { Dictionary } from '../options.js';
export interface TableDowCellProps {
    dow: number;
    dayHeaderFormat: DateFormatter;
    colSpan?: number;
    isSticky?: boolean;
    extraRenderProps?: Dictionary;
    extraDataAttrs?: Dictionary;
    extraClassNames?: string[];
}
export declare class TableDowCell extends BaseComponent<TableDowCellProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TableDowCell.d.ts.map