import { addDurations, multiplyDuration, wholeDivideDurations, memoize, DateComponent, } from '@fullcalendar/core/internal';
import { createElement, } from '@fullcalendar/core/preact';
import { TimeColsSlats } from './TimeColsSlats.js';
import { TimeColsContent } from './TimeColsContent.js';
/* A component that renders one or more columns of vertical time slots
----------------------------------------------------------------------------------------------------------------------*/
export class TimeCols extends DateComponent {
    constructor() {
        super(...arguments);
        this.processSlotOptions = memoize(processSlotOptions);
        this.state = {
            slatCoords: null,
        };
        this.handleRootEl = (el) => {
            if (el) {
                this.context.registerInteractiveComponent(this, {
                    el,
                    isHitComboAllowed: this.props.isHitComboAllowed,
                });
            }
            else {
                this.context.unregisterInteractiveComponent(this);
            }
        };
        this.handleScrollRequest = (request) => {
            let { onScrollTopRequest } = this.props;
            let { slatCoords } = this.state;
            if (onScrollTopRequest && slatCoords) {
                if (request.time) {
                    let top = slatCoords.computeTimeTop(request.time);
                    top = Math.ceil(top); // zoom can give weird floating-point values. rather scroll a little bit further
                    if (top) {
                        top += 1; // to overcome top border that slots beyond the first have. looks better
                    }
                    onScrollTopRequest(top);
                }
                return true;
            }
            return false;
        };
        this.handleColCoords = (colCoords) => {
            this.colCoords = colCoords;
        };
        this.handleSlatCoords = (slatCoords) => {
            this.setState({ slatCoords });
            if (this.props.onSlatCoords) {
                this.props.onSlatCoords(slatCoords);
            }
        };
    }
    render() {
        let { props, state } = this;
        return (createElement("div", { className: "fc-timegrid-body", ref: this.handleRootEl, style: {
                // these props are important to give this wrapper correct dimensions for interactions
                // TODO: if we set it here, can we avoid giving to inner tables?
                width: props.clientWidth,
                minWidth: props.tableMinWidth,
            } },
            createElement(TimeColsSlats, { axis: props.axis, dateProfile: props.dateProfile, slatMetas: props.slatMetas, clientWidth: props.clientWidth, minHeight: props.expandRows ? props.clientHeight : '', tableMinWidth: props.tableMinWidth, tableColGroupNode: props.axis ? props.tableColGroupNode : null /* axis depends on the colgroup's shrinking */, onCoords: this.handleSlatCoords }),
            createElement(TimeColsContent, { cells: props.cells, axis: props.axis, dateProfile: props.dateProfile, businessHourSegs: props.businessHourSegs, bgEventSegs: props.bgEventSegs, fgEventSegs: props.fgEventSegs, dateSelectionSegs: props.dateSelectionSegs, eventSelection: props.eventSelection, eventDrag: props.eventDrag, eventResize: props.eventResize, todayRange: props.todayRange, nowDate: props.nowDate, nowIndicatorSegs: props.nowIndicatorSegs, clientWidth: props.clientWidth, tableMinWidth: props.tableMinWidth, tableColGroupNode: props.tableColGroupNode, slatCoords: state.slatCoords, onColCoords: this.handleColCoords, forPrint: props.forPrint })));
    }
    componentDidMount() {
        this.scrollResponder = this.context.createScrollResponder(this.handleScrollRequest);
    }
    componentDidUpdate(prevProps) {
        this.scrollResponder.update(prevProps.dateProfile !== this.props.dateProfile);
    }
    componentWillUnmount() {
        this.scrollResponder.detach();
    }
    queryHit(positionLeft, positionTop) {
        let { dateEnv, options } = this.context;
        let { colCoords } = this;
        let { dateProfile } = this.props;
        let { slatCoords } = this.state;
        let { snapDuration, snapsPerSlot } = this.processSlotOptions(this.props.slotDuration, options.snapDuration);
        let colIndex = colCoords.leftToIndex(positionLeft);
        let slatIndex = slatCoords.positions.topToIndex(positionTop);
        if (colIndex != null && slatIndex != null) {
            let cell = this.props.cells[colIndex];
            let slatTop = slatCoords.positions.tops[slatIndex];
            let slatHeight = slatCoords.positions.getHeight(slatIndex);
            let partial = (positionTop - slatTop) / slatHeight; // floating point number between 0 and 1
            let localSnapIndex = Math.floor(partial * snapsPerSlot); // the snap # relative to start of slat
            let snapIndex = slatIndex * snapsPerSlot + localSnapIndex;
            let dayDate = this.props.cells[colIndex].date;
            let time = addDurations(dateProfile.slotMinTime, multiplyDuration(snapDuration, snapIndex));
            let start = dateEnv.add(dayDate, time);
            let end = dateEnv.add(start, snapDuration);
            return {
                dateProfile,
                dateSpan: Object.assign({ range: { start, end }, allDay: false }, cell.extraDateSpan),
                dayEl: colCoords.els[colIndex],
                rect: {
                    left: colCoords.lefts[colIndex],
                    right: colCoords.rights[colIndex],
                    top: slatTop,
                    bottom: slatTop + slatHeight,
                },
                layer: 0,
            };
        }
        return null;
    }
}
function processSlotOptions(slotDuration, snapDurationOverride) {
    let snapDuration = snapDurationOverride || slotDuration;
    let snapsPerSlot = wholeDivideDurations(slotDuration, snapDuration);
    if (snapsPerSlot === null) {
        snapDuration = slotDuration;
        snapsPerSlot = 1;
        // TODO: say warning?
    }
    return { snapDuration, snapsPerSlot };
}
//# sourceMappingURL=TimeCols.js.map