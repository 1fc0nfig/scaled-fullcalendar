import { BaseComponent, RefMap, PositionCache, memoize, NowIndicatorContainer, } from '@fullcalendar/core/internal';
import { createElement, createRef, } from '@fullcalendar/core/preact';
import { splitSegsByCol, splitInteractionByCol } from './TimeColsSeg.js';
import { TimeCol } from './TimeCol.js';
export class TimeColsContent extends BaseComponent {
    constructor() {
        super(...arguments);
        this.splitFgEventSegs = memoize(splitSegsByCol);
        this.splitBgEventSegs = memoize(splitSegsByCol);
        this.splitBusinessHourSegs = memoize(splitSegsByCol);
        this.splitNowIndicatorSegs = memoize(splitSegsByCol);
        this.splitDateSelectionSegs = memoize(splitSegsByCol);
        this.splitEventDrag = memoize(splitInteractionByCol);
        this.splitEventResize = memoize(splitInteractionByCol);
        this.rootElRef = createRef();
        this.cellElRefs = new RefMap();
    }
    render() {
        let { props, context } = this;
        let nowIndicatorTop = context.options.nowIndicator &&
            props.slatCoords &&
            props.slatCoords.safeComputeTop(props.nowDate); // might return void
        let colCnt = props.cells.length;
        let fgEventSegsByRow = this.splitFgEventSegs(props.fgEventSegs, colCnt);
        let bgEventSegsByRow = this.splitBgEventSegs(props.bgEventSegs, colCnt);
        let businessHourSegsByRow = this.splitBusinessHourSegs(props.businessHourSegs, colCnt);
        let nowIndicatorSegsByRow = this.splitNowIndicatorSegs(props.nowIndicatorSegs, colCnt);
        let dateSelectionSegsByRow = this.splitDateSelectionSegs(props.dateSelectionSegs, colCnt);
        let eventDragByRow = this.splitEventDrag(props.eventDrag, colCnt);
        let eventResizeByRow = this.splitEventResize(props.eventResize, colCnt);
        return (createElement("div", { className: "fc-timegrid-cols", ref: this.rootElRef },
            createElement("table", { role: "presentation", style: {
                    minWidth: props.tableMinWidth,
                    width: props.clientWidth,
                } },
                props.tableColGroupNode,
                createElement("tbody", { role: "presentation" },
                    createElement("tr", { role: "row" },
                        props.axis && (createElement("td", { "aria-hidden": true, className: "fc-timegrid-col fc-timegrid-axis" },
                            createElement("div", { className: "fc-timegrid-col-frame" },
                                createElement("div", { className: "fc-timegrid-now-indicator-container" }, typeof nowIndicatorTop === 'number' && (createElement(NowIndicatorContainer, { elClasses: ['fc-timegrid-now-indicator-arrow'], elStyle: { top: nowIndicatorTop }, isAxis: true, date: props.nowDate })))))),
                        props.cells.map((cell, i) => (createElement(TimeCol, { key: cell.key, elRef: this.cellElRefs.createRef(cell.key), dateProfile: props.dateProfile, date: cell.date, nowDate: props.nowDate, todayRange: props.todayRange, extraRenderProps: cell.extraRenderProps, extraDataAttrs: cell.extraDataAttrs, extraClassNames: cell.extraClassNames, extraDateSpan: cell.extraDateSpan, fgEventSegs: fgEventSegsByRow[i], bgEventSegs: bgEventSegsByRow[i], businessHourSegs: businessHourSegsByRow[i], nowIndicatorSegs: nowIndicatorSegsByRow[i], dateSelectionSegs: dateSelectionSegsByRow[i], eventDrag: eventDragByRow[i], eventResize: eventResizeByRow[i], slatCoords: props.slatCoords, eventSelection: props.eventSelection, forPrint: props.forPrint }))))))));
    }
    componentDidMount() {
        this.updateCoords();
    }
    componentDidUpdate() {
        this.updateCoords();
    }
    updateCoords() {
        let { props } = this;
        if (props.onColCoords &&
            props.clientWidth !== null // means sizing has stabilized
        ) {
            props.onColCoords(new PositionCache(this.rootElRef.current, collectCellEls(this.cellElRefs.currentMap, props.cells), true, // horizontal
            false));
        }
    }
}
function collectCellEls(elMap, cells) {
    return cells.map((cell) => elMap[cell.key]);
}
//# sourceMappingURL=TimeColsContent.js.map