import { DateProfileGenerator, DateProfile, DayTableModel } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
import { TableView } from './TableView.js';
export declare class DayTableView extends TableView {
    private buildDayTableModel;
    private headerRef;
    private tableRef;
    render(): createElement.JSX.Element;
}
export declare function buildDayTableModel(dateProfile: DateProfile, dateProfileGenerator: DateProfileGenerator): DayTableModel;
//# sourceMappingURL=DayTableView.d.ts.map