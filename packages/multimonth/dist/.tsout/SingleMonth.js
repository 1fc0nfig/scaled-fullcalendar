import { DateComponent, DayHeader, memoize, getUniqueDomId } from '@fullcalendar/core/internal';
import { TableRows, buildDayTableModel, DayTableSlicer } from '@fullcalendar/daygrid/internal';
import { createElement } from '@fullcalendar/core/preact';
export class SingleMonth extends DateComponent {
    constructor() {
        super(...arguments);
        this.buildDayTableModel = memoize(buildDayTableModel);
        this.slicer = new DayTableSlicer();
        this.state = {
            labelId: getUniqueDomId(),
        };
    }
    render() {
        const { props, state, context } = this;
        const { dateProfile, forPrint } = props;
        const { options } = context;
        const dayTableModel = this.buildDayTableModel(dateProfile, context.dateProfileGenerator);
        const slicedProps = this.slicer.sliceProps(props, dateProfile, options.nextDayThreshold, context, dayTableModel);
        // ensure single-month has aspect ratio
        const tableHeight = props.tableWidth != null ? props.tableWidth / options.aspectRatio : null;
        const rowCnt = dayTableModel.cells.length;
        const rowHeight = tableHeight != null ? tableHeight / rowCnt : null;
        return (createElement("div", { ref: props.elRef, "data-date": props.isoDateStr, className: "fc-multimonth-month", style: { width: props.width }, role: "grid", "aria-labelledby": state.labelId },
            createElement("div", { className: "fc-multimonth-header", style: { marginBottom: rowHeight }, role: "presentation" },
                createElement("div", { className: "fc-multimonth-title", id: state.labelId }, context.dateEnv.format(props.dateProfile.currentRange.start, props.titleFormat)),
                createElement("table", { className: [
                        'fc-multimonth-header-table',
                        context.theme.getClass('table'),
                    ].join(' '), role: "presentation" },
                    createElement("thead", { role: "rowgroup" },
                        createElement(DayHeader, { dateProfile: props.dateProfile, dates: dayTableModel.headerDates, datesRepDistinctDays: false })))),
            createElement("div", { className: [
                    'fc-multimonth-daygrid',
                    'fc-daygrid',
                    'fc-daygrid-body',
                    !forPrint && 'fc-daygrid-body-balanced',
                    forPrint && 'fc-daygrid-body-unbalanced',
                    forPrint && 'fc-daygrid-body-natural',
                ].join(' '), style: { marginTop: -rowHeight } },
                createElement("table", { className: [
                        'fc-multimonth-daygrid-table',
                        context.theme.getClass('table'),
                    ].join(' '), style: { height: forPrint ? '' : tableHeight }, role: "presentation" },
                    createElement("tbody", { role: "rowgroup" },
                        createElement(TableRows, Object.assign({}, slicedProps, { dateProfile: dateProfile, cells: dayTableModel.cells, eventSelection: props.eventSelection, dayMaxEvents: !forPrint, dayMaxEventRows: !forPrint, showWeekNumbers: options.weekNumbers, clientWidth: props.clientWidth, clientHeight: props.clientHeight, forPrint: forPrint })))))));
    }
}
//# sourceMappingURL=SingleMonth.js.map