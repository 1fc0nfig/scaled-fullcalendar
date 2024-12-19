import { CssDimValue } from '@fullcalendar/core';
import { DateComponent } from '@fullcalendar/core/internal';
import { VNode, RefObject, createElement } from '@fullcalendar/core/preact';
import { TableRowsProps } from './TableRows.js';
export interface TableProps extends TableRowsProps {
    colGroupNode: VNode;
    tableMinWidth: CssDimValue;
    expandRows: boolean;
    headerAlignElRef?: RefObject<HTMLElement>;
}
export declare class Table extends DateComponent<TableProps> {
    private elRef;
    private needsScrollReset;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TableProps): void;
    requestScrollReset(): void;
    flushScrollReset(): void;
}
//# sourceMappingURL=Table.d.ts.map