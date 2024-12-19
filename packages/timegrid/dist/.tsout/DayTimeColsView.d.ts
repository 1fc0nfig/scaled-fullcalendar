import { DateProfileGenerator, DateProfile, DayTableModel } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
import { TimeColsView } from './TimeColsView.js';
export declare class DayTimeColsView extends TimeColsView {
    private buildTimeColsModel;
    private buildSlatMetas;
    render(): createElement.JSX.Element;
}
export declare function buildTimeColsModel(dateProfile: DateProfile, dateProfileGenerator: DateProfileGenerator): DayTableModel;
//# sourceMappingURL=DayTimeColsView.d.ts.map