import { MoreLinkContainer, BaseComponent, memoize, getSegMeta, } from '@fullcalendar/core/internal';
import { createElement, Fragment } from '@fullcalendar/core/preact';
import { hasListItemDisplay } from './event-rendering.js';
import { TableBlockEvent } from './TableBlockEvent.js';
import { TableListItemEvent } from './TableListItemEvent.js';
export class TableCellMoreLink extends BaseComponent {
    constructor() {
        super(...arguments);
        this.compileSegs = memoize(compileSegs);
    }
    render() {
        let { props } = this;
        let { allSegs, invisibleSegs } = this.compileSegs(props.singlePlacements);
        return (createElement(MoreLinkContainer, { elClasses: ['fc-daygrid-more-link'], dateProfile: props.dateProfile, todayRange: props.todayRange, allDayDate: props.allDayDate, moreCnt: props.moreCnt, allSegs: allSegs, hiddenSegs: invisibleSegs, alignmentElRef: props.alignmentElRef, alignGridTop: props.alignGridTop, extraDateSpan: props.extraDateSpan, popoverContent: () => {
                let isForcedInvisible = (props.eventDrag ? props.eventDrag.affectedInstances : null) ||
                    (props.eventResize ? props.eventResize.affectedInstances : null) ||
                    {};
                return (createElement(Fragment, null, allSegs.map((seg) => {
                    let instanceId = seg.eventRange.instance.instanceId;
                    return (createElement("div", { className: "fc-daygrid-event-harness", key: instanceId, style: {
                            visibility: isForcedInvisible[instanceId] ? 'hidden' : '',
                        } }, hasListItemDisplay(seg) ? (createElement(TableListItemEvent, Object.assign({ seg: seg, isDragging: false, isSelected: instanceId === props.eventSelection, defaultDisplayEventEnd: false }, getSegMeta(seg, props.todayRange)))) : (createElement(TableBlockEvent, Object.assign({ seg: seg, isDragging: false, isResizing: false, isDateSelecting: false, isSelected: instanceId === props.eventSelection, defaultDisplayEventEnd: false }, getSegMeta(seg, props.todayRange))))));
                })));
            } }));
    }
}
function compileSegs(singlePlacements) {
    let allSegs = [];
    let invisibleSegs = [];
    for (let placement of singlePlacements) {
        allSegs.push(placement.seg);
        if (!placement.isVisible) {
            invisibleSegs.push(placement.seg);
        }
    }
    return { allSegs, invisibleSegs };
}
//# sourceMappingURL=TableCellMoreLink.js.map