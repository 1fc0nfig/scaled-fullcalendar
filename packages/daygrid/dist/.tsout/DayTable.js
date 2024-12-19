import { DateComponent, } from '@fullcalendar/core/internal';
import { createElement, createRef, } from '@fullcalendar/core/preact';
import { Table } from './Table.js';
import { DayTableSlicer } from './DayTableSlicer.js';
export class DayTable extends DateComponent {
    constructor() {
        super(...arguments);
        this.slicer = new DayTableSlicer();
        this.tableRef = createRef();
    }
    render() {
        let { props, context } = this;
        return (createElement(Table, Object.assign({ ref: this.tableRef }, this.slicer.sliceProps(props, props.dateProfile, props.nextDayThreshold, context, props.dayTableModel), { dateProfile: props.dateProfile, cells: props.dayTableModel.cells, colGroupNode: props.colGroupNode, tableMinWidth: props.tableMinWidth, renderRowIntro: props.renderRowIntro, dayMaxEvents: props.dayMaxEvents, dayMaxEventRows: props.dayMaxEventRows, showWeekNumbers: props.showWeekNumbers, expandRows: props.expandRows, headerAlignElRef: props.headerAlignElRef, clientWidth: props.clientWidth, clientHeight: props.clientHeight, forPrint: props.forPrint })));
    }
}
//# sourceMappingURL=DayTable.js.map