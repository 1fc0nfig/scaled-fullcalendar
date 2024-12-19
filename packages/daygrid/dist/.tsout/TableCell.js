import { DateComponent, buildNavLinkAttrs, WeekNumberContainer, DayCellContainer, setRef, createFormatter, getUniqueDomId, hasCustomDayCellContent, addMs, } from '@fullcalendar/core/internal';
import { createElement, createRef, Fragment, } from '@fullcalendar/core/preact';
import { TableCellMoreLink } from './TableCellMoreLink.js';
const DEFAULT_WEEK_NUM_FORMAT = createFormatter({ week: 'narrow' });
export class TableCell extends DateComponent {
    constructor() {
        super(...arguments);
        this.rootElRef = createRef();
        this.state = {
            dayNumberId: getUniqueDomId(),
        };
        this.handleRootEl = (el) => {
            setRef(this.rootElRef, el);
            setRef(this.props.elRef, el);
        };
    }
    render() {
        let { context, props, state, rootElRef } = this;
        let { options, dateEnv } = context;
        let { date, dateProfile } = props;
        // TODO: memoize this?
        const isMonthStart = props.showDayNumber &&
            shouldDisplayMonthStart(date, dateProfile.currentRange, dateEnv);
        return (createElement(DayCellContainer, { elTag: "td", elRef: this.handleRootEl, elClasses: [
                'fc-daygrid-day',
                ...(props.extraClassNames || []),
            ], elAttrs: Object.assign(Object.assign(Object.assign({}, props.extraDataAttrs), (props.showDayNumber ? { 'aria-labelledby': state.dayNumberId } : {})), { role: 'gridcell' }), defaultGenerator: renderTopInner, date: date, dateProfile: dateProfile, todayRange: props.todayRange, showDayNumber: props.showDayNumber, isMonthStart: isMonthStart, extraRenderProps: props.extraRenderProps }, (InnerContent, renderProps) => (createElement("div", { ref: props.innerElRef, className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner", style: { minHeight: props.minHeight } },
            props.showWeekNumber && (createElement(WeekNumberContainer, { elTag: "a", elClasses: ['fc-daygrid-week-number'], elAttrs: buildNavLinkAttrs(context, date, 'week'), date: date, defaultFormat: DEFAULT_WEEK_NUM_FORMAT })),
            !renderProps.isDisabled &&
                (props.showDayNumber || hasCustomDayCellContent(options) || props.forceDayTop) ? (createElement("div", { className: "fc-daygrid-day-top" },
                createElement(InnerContent, { elTag: "a", elClasses: [
                        'fc-daygrid-day-number',
                        isMonthStart && 'fc-daygrid-month-start',
                    ], elAttrs: Object.assign(Object.assign({}, buildNavLinkAttrs(context, date)), { id: state.dayNumberId }) }))) : props.showDayNumber ? (
            // for creating correct amount of space (see issue #7162)
            createElement("div", { className: "fc-daygrid-day-top", style: { visibility: 'hidden' } },
                createElement("a", { className: "fc-daygrid-day-number" }, "\u00A0"))) : undefined,
            createElement("div", { className: "fc-daygrid-day-events", ref: props.fgContentElRef },
                props.fgContent,
                createElement("div", { className: "fc-daygrid-day-bottom", style: { marginTop: props.moreMarginTop } },
                    createElement(TableCellMoreLink, { allDayDate: date, singlePlacements: props.singlePlacements, moreCnt: props.moreCnt, alignmentElRef: rootElRef, alignGridTop: !props.showDayNumber, extraDateSpan: props.extraDateSpan, dateProfile: props.dateProfile, eventSelection: props.eventSelection, eventDrag: props.eventDrag, eventResize: props.eventResize, todayRange: props.todayRange }))),
            createElement("div", { className: "fc-daygrid-day-bg" }, props.bgContent)))));
    }
}
function renderTopInner(props) {
    return props.dayNumberText || createElement(Fragment, null, "\u00A0");
}
function shouldDisplayMonthStart(date, currentRange, dateEnv) {
    const { start: currentStart, end: currentEnd } = currentRange;
    const currentEndIncl = addMs(currentEnd, -1);
    const currentFirstYear = dateEnv.getYear(currentStart);
    const currentFirstMonth = dateEnv.getMonth(currentStart);
    const currentLastYear = dateEnv.getYear(currentEndIncl);
    const currentLastMonth = dateEnv.getMonth(currentEndIncl);
    // spans more than one month?
    return !(currentFirstYear === currentLastYear && currentFirstMonth === currentLastMonth) &&
        Boolean(
        // first date in current view?
        date.valueOf() === currentStart.valueOf() ||
            // a month-start that's within the current range?
            (dateEnv.getDay(date) === 1 && date.valueOf() < currentEnd.valueOf()));
}
//# sourceMappingURL=TableCell.js.map