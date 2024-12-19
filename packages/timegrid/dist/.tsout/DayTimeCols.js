import { DateComponent, memoize, NowTimer, } from '@fullcalendar/core/internal';
import { createElement, createRef, } from '@fullcalendar/core/preact';
import { TimeCols } from './TimeCols.js';
import { DayTimeColsSlicer } from './DayTimeColsSlicer.js';
export class DayTimeCols extends DateComponent {
    constructor() {
        super(...arguments);
        this.buildDayRanges = memoize(buildDayRanges);
        this.slicer = new DayTimeColsSlicer();
        this.timeColsRef = createRef();
    }
    render() {
        let { props, context } = this;
        let { dateProfile, dayTableModel } = props;
        let { nowIndicator, nextDayThreshold } = context.options;
        let dayRanges = this.buildDayRanges(dayTableModel, dateProfile, context.dateEnv);
        // give it the first row of cells
        // TODO: would move this further down hierarchy, but sliceNowDate needs it
        return (createElement(NowTimer, { unit: nowIndicator ? 'minute' : 'day' }, (nowDate, todayRange) => (createElement(TimeCols, Object.assign({ ref: this.timeColsRef }, this.slicer.sliceProps(props, dateProfile, null, context, dayRanges), { forPrint: props.forPrint, axis: props.axis, dateProfile: dateProfile, slatMetas: props.slatMetas, slotDuration: props.slotDuration, cells: dayTableModel.cells[0], tableColGroupNode: props.tableColGroupNode, tableMinWidth: props.tableMinWidth, clientWidth: props.clientWidth, clientHeight: props.clientHeight, expandRows: props.expandRows, nowDate: nowDate, nowIndicatorSegs: nowIndicator && this.slicer.sliceNowDate(nowDate, dateProfile, nextDayThreshold, context, dayRanges), todayRange: todayRange, onScrollTopRequest: props.onScrollTopRequest, onSlatCoords: props.onSlatCoords })))));
    }
}
export function buildDayRanges(dayTableModel, dateProfile, dateEnv) {
    let ranges = [];
    for (let date of dayTableModel.headerDates) {
        ranges.push({
            start: dateEnv.add(date, dateProfile.slotMinTime),
            end: dateEnv.add(date, dateProfile.slotMaxTime),
        });
    }
    return ranges;
}
//# sourceMappingURL=DayTimeCols.js.map