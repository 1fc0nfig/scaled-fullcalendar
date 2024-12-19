import { BaseComponent, getSegMeta, DayCellContainer, NowIndicatorContainer, BgEvent, renderFill, buildIsoString, computeEarliestSegStart, buildEventRangeKey, sortEventSegs, memoize, hasCustomDayCellContent, } from '@fullcalendar/core/internal';
import { createElement, Fragment, } from '@fullcalendar/core/preact';
import { TimeColMoreLink } from './TimeColMoreLink.js';
import { computeFgSegPlacements, computeSegVCoords } from './event-placement.js';
import { TimeColEvent } from './TimeColEvent.js';
export class TimeCol extends BaseComponent {
    constructor() {
        super(...arguments);
        this.sortEventSegs = memoize(sortEventSegs);
    }
    // TODO: memoize event-placement?
    render() {
        let { props, context } = this;
        let { options } = context;
        let isSelectMirror = options.selectMirror;
        let mirrorSegs = // yuck
         (props.eventDrag && props.eventDrag.segs) ||
            (props.eventResize && props.eventResize.segs) ||
            (isSelectMirror && props.dateSelectionSegs) ||
            [];
        let interactionAffectedInstances = // TODO: messy way to compute this
         (props.eventDrag && props.eventDrag.affectedInstances) ||
            (props.eventResize && props.eventResize.affectedInstances) ||
            {};
        let sortedFgSegs = this.sortEventSegs(props.fgEventSegs, options.eventOrder);
        return (createElement(DayCellContainer, { elTag: "td", elRef: props.elRef, elClasses: [
                'fc-timegrid-col',
                ...(props.extraClassNames || []),
            ], elAttrs: Object.assign({ role: 'gridcell' }, props.extraDataAttrs), date: props.date, dateProfile: props.dateProfile, todayRange: props.todayRange, extraRenderProps: props.extraRenderProps }, (InnerContent) => (createElement("div", { className: "fc-timegrid-col-frame" },
            createElement("div", { className: "fc-timegrid-col-bg" },
                this.renderFillSegs(props.businessHourSegs, 'non-business'),
                this.renderFillSegs(props.bgEventSegs, 'bg-event'),
                this.renderFillSegs(props.dateSelectionSegs, 'highlight')),
            createElement("div", { className: "fc-timegrid-col-events" }, this.renderFgSegs(sortedFgSegs, interactionAffectedInstances, false, false, false)),
            createElement("div", { className: "fc-timegrid-col-events" }, this.renderFgSegs(mirrorSegs, {}, Boolean(props.eventDrag), Boolean(props.eventResize), Boolean(isSelectMirror), 'mirror')),
            createElement("div", { className: "fc-timegrid-now-indicator-container" }, this.renderNowIndicator(props.nowIndicatorSegs)),
            hasCustomDayCellContent(options) && (createElement(InnerContent, { elTag: "div", elClasses: ['fc-timegrid-col-misc'] }))))));
    }
    renderFgSegs(sortedFgSegs, segIsInvisible, isDragging, isResizing, isDateSelecting, forcedKey) {
        let { props } = this;
        if (props.forPrint) {
            return renderPlainFgSegs(sortedFgSegs, props);
        }
        return this.renderPositionedFgSegs(sortedFgSegs, segIsInvisible, isDragging, isResizing, isDateSelecting, forcedKey);
    }
    renderPositionedFgSegs(segs, // if not mirror, needs to be sorted
    segIsInvisible, isDragging, isResizing, isDateSelecting, forcedKey) {
        let { eventMaxStack, eventShortHeight, eventOrderStrict, eventMinHeight } = this.context.options;
        let { date, slatCoords, eventSelection, todayRange, nowDate } = this.props;
        let isMirror = isDragging || isResizing || isDateSelecting;
        let segVCoords = computeSegVCoords(segs, date, slatCoords, eventMinHeight);
        let { segPlacements, hiddenGroups } = computeFgSegPlacements(segs, segVCoords, eventOrderStrict, eventMaxStack);
        return (createElement(Fragment, null,
            this.renderHiddenGroups(hiddenGroups, segs),
            segPlacements.map((segPlacement) => {
                let { seg, rect } = segPlacement;
                let instanceId = seg.eventRange.instance.instanceId;
                let isVisible = isMirror || Boolean(!segIsInvisible[instanceId] && rect);
                let vStyle = computeSegVStyle(rect && rect.span);
                let hStyle = (!isMirror && rect) ? this.computeSegHStyle(rect) : { left: 0, right: 0 };
                let isInset = Boolean(rect) && rect.stackForward > 0;
                let isShort = Boolean(rect) && (rect.span.end - rect.span.start) < eventShortHeight; // look at other places for this problem
                return (createElement("div", { className: 'fc-timegrid-event-harness' +
                        (isInset ? ' fc-timegrid-event-harness-inset' : ''), key: forcedKey || instanceId, style: Object.assign(Object.assign({ visibility: isVisible ? '' : 'hidden' }, vStyle), hStyle) },
                    createElement(TimeColEvent, Object.assign({ seg: seg, isDragging: isDragging, isResizing: isResizing, isDateSelecting: isDateSelecting, isSelected: instanceId === eventSelection, isShort: isShort }, getSegMeta(seg, todayRange, nowDate)))));
            })));
    }
    // will already have eventMinHeight applied because segInputs already had it
    renderHiddenGroups(hiddenGroups, segs) {
        let { extraDateSpan, dateProfile, todayRange, nowDate, eventSelection, eventDrag, eventResize } = this.props;
        return (createElement(Fragment, null, hiddenGroups.map((hiddenGroup) => {
            let positionCss = computeSegVStyle(hiddenGroup.span);
            let hiddenSegs = compileSegsFromEntries(hiddenGroup.entries, segs);
            return (createElement(TimeColMoreLink, { key: buildIsoString(computeEarliestSegStart(hiddenSegs)), hiddenSegs: hiddenSegs, top: positionCss.top, bottom: positionCss.bottom, extraDateSpan: extraDateSpan, dateProfile: dateProfile, todayRange: todayRange, nowDate: nowDate, eventSelection: eventSelection, eventDrag: eventDrag, eventResize: eventResize }));
        })));
    }
    renderFillSegs(segs, fillType) {
        let { props, context } = this;
        let segVCoords = computeSegVCoords(segs, props.date, props.slatCoords, context.options.eventMinHeight); // don't assume all populated
        let children = segVCoords.map((vcoords, i) => {
            let seg = segs[i];
            return (createElement("div", { key: buildEventRangeKey(seg.eventRange), className: "fc-timegrid-bg-harness", style: computeSegVStyle(vcoords) }, fillType === 'bg-event' ?
                createElement(BgEvent, Object.assign({ seg: seg }, getSegMeta(seg, props.todayRange, props.nowDate))) :
                renderFill(fillType)));
        });
        return createElement(Fragment, null, children);
    }
    renderNowIndicator(segs) {
        let { slatCoords, date } = this.props;
        if (!slatCoords) {
            return null;
        }
        return segs.map((seg, i) => (createElement(NowIndicatorContainer
        // key doesn't matter. will only ever be one
        , { 
            // key doesn't matter. will only ever be one
            key: i, elClasses: ['fc-timegrid-now-indicator-line'], elStyle: {
                top: slatCoords.computeDateTop(seg.start, date),
            }, isAxis: false, date: date })));
    }
    computeSegHStyle(segHCoords) {
        let { isRtl, options } = this.context;
        let shouldOverlap = options.slotEventOverlap;
        let nearCoord = segHCoords.levelCoord; // the left side if LTR. the right side if RTL. floating-point
        let farCoord = segHCoords.levelCoord + segHCoords.thickness; // the right side if LTR. the left side if RTL. floating-point
        let left; // amount of space from left edge, a fraction of the total width
        let right; // amount of space from right edge, a fraction of the total width
        if (shouldOverlap) {
            // double the width, but don't go beyond the maximum forward coordinate (1.0)
            farCoord = Math.min(1, nearCoord + (farCoord - nearCoord) * 2);
        }
        if (isRtl) {
            left = 1 - farCoord;
            right = nearCoord;
        }
        else {
            left = nearCoord;
            right = 1 - farCoord;
        }
        let props = {
            zIndex: segHCoords.stackDepth + 1,
            left: left * 100 + '%',
            right: right * 100 + '%',
        };
        if (shouldOverlap && !segHCoords.stackForward) {
            // add padding to the edge so that forward stacked events don't cover the resizer's icon
            props[isRtl ? 'marginLeft' : 'marginRight'] = 10 * 2; // 10 is a guesstimate of the icon's width
        }
        return props;
    }
}
export function renderPlainFgSegs(sortedFgSegs, { todayRange, nowDate, eventSelection, eventDrag, eventResize }) {
    let hiddenInstances = (eventDrag ? eventDrag.affectedInstances : null) ||
        (eventResize ? eventResize.affectedInstances : null) ||
        {};
    return (createElement(Fragment, null, sortedFgSegs.map((seg) => {
        let instanceId = seg.eventRange.instance.instanceId;
        return (createElement("div", { key: instanceId, style: { visibility: hiddenInstances[instanceId] ? 'hidden' : '' } },
            createElement(TimeColEvent, Object.assign({ seg: seg, isDragging: false, isResizing: false, isDateSelecting: false, isSelected: instanceId === eventSelection, isShort: false }, getSegMeta(seg, todayRange, nowDate)))));
    })));
}
function computeSegVStyle(segVCoords) {
    if (!segVCoords) {
        return { top: '', bottom: '' };
    }
    return {
        top: segVCoords.start,
        bottom: -segVCoords.end,
    };
}
function compileSegsFromEntries(segEntries, allSegs) {
    return segEntries.map((segEntry) => allSegs[segEntry.index]);
}
//# sourceMappingURL=TimeCol.js.map