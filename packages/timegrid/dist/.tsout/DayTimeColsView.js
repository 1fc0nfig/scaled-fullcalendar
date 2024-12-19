import { DayHeader, DaySeriesModel, DayTableModel, memoize, } from '@fullcalendar/core/internal';
import { createElement, } from '@fullcalendar/core/preact';
import { DayTable } from '@fullcalendar/daygrid/internal';
import { TimeColsView } from './TimeColsView.js';
import { DayTimeCols } from './DayTimeCols.js';
import { buildSlatMetas } from './time-slat-meta.js';
export class DayTimeColsView extends TimeColsView {
    constructor() {
        super(...arguments);
        this.buildTimeColsModel = memoize(buildTimeColsModel);
        this.buildSlatMetas = memoize(buildSlatMetas);
    }
    render() {
        let { options, dateEnv, dateProfileGenerator } = this.context;
        let { props } = this;
        let { dateProfile } = props;
        let dayTableModel = this.buildTimeColsModel(dateProfile, dateProfileGenerator);
        let splitProps = this.allDaySplitter.splitProps(props);
        let slatMetas = this.buildSlatMetas(dateProfile.slotMinTime, dateProfile.slotMaxTime, options.slotLabelInterval, options.slotDuration, dateEnv);
        let { dayMinWidth } = options;
        let hasAttachedAxis = !dayMinWidth;
        let hasDetachedAxis = dayMinWidth;
        let headerContent = options.dayHeaders && (createElement(DayHeader, { dates: dayTableModel.headerDates, dateProfile: dateProfile, datesRepDistinctDays: true, renderIntro: hasAttachedAxis ? this.renderHeadAxis : null }));
        let allDayContent = (options.allDaySlot !== false) && ((contentArg) => (createElement(DayTable, Object.assign({}, splitProps.allDay, { dateProfile: dateProfile, dayTableModel: dayTableModel, nextDayThreshold: options.nextDayThreshold, tableMinWidth: contentArg.tableMinWidth, colGroupNode: contentArg.tableColGroupNode, renderRowIntro: hasAttachedAxis ? this.renderTableRowAxis : null, showWeekNumbers: false, expandRows: false, headerAlignElRef: this.headerElRef, clientWidth: contentArg.clientWidth, clientHeight: contentArg.clientHeight, forPrint: props.forPrint }, this.getAllDayMaxEventProps()))));
        let timeGridContent = (contentArg) => (createElement(DayTimeCols, Object.assign({}, splitProps.timed, { dayTableModel: dayTableModel, dateProfile: dateProfile, axis: hasAttachedAxis, slotDuration: options.slotDuration, slatMetas: slatMetas, forPrint: props.forPrint, tableColGroupNode: contentArg.tableColGroupNode, tableMinWidth: contentArg.tableMinWidth, clientWidth: contentArg.clientWidth, clientHeight: contentArg.clientHeight, onSlatCoords: this.handleSlatCoords, expandRows: contentArg.expandRows, onScrollTopRequest: this.handleScrollTopRequest })));
        return hasDetachedAxis
            ? this.renderHScrollLayout(headerContent, allDayContent, timeGridContent, dayTableModel.colCnt, dayMinWidth, slatMetas, this.state.slatCoords)
            : this.renderSimpleLayout(headerContent, allDayContent, timeGridContent);
    }
}
export function buildTimeColsModel(dateProfile, dateProfileGenerator) {
    let daySeries = new DaySeriesModel(dateProfile.renderRange, dateProfileGenerator);
    return new DayTableModel(daySeries, false);
}
//# sourceMappingURL=DayTimeColsView.js.map