import { BaseComponent, buildSegTimeText, EventContainer, getSegAnchorAttrs, } from '@fullcalendar/core/internal';
import { createElement, Fragment } from '@fullcalendar/core/preact';
import { DEFAULT_TABLE_EVENT_TIME_FORMAT } from './event-rendering.js';
export class TableListItemEvent extends BaseComponent {
    render() {
        let { props, context } = this;
        let { options } = context;
        let { seg } = props;
        let timeFormat = options.eventTimeFormat || DEFAULT_TABLE_EVENT_TIME_FORMAT;
        let timeText = buildSegTimeText(seg, timeFormat, context, true, props.defaultDisplayEventEnd);
        return (createElement(EventContainer, Object.assign({}, props, { elTag: "a", elClasses: ['fc-daygrid-event', 'fc-daygrid-dot-event'], elAttrs: getSegAnchorAttrs(props.seg, context), defaultGenerator: renderInnerContent, timeText: timeText, isResizing: false, isDateSelecting: false })));
    }
}
function renderInnerContent(renderProps) {
    return (createElement(Fragment, null,
        createElement("div", { className: "fc-daygrid-event-dot", style: { borderColor: renderProps.borderColor || renderProps.backgroundColor } }),
        renderProps.timeText && (createElement("div", { className: "fc-event-time" }, renderProps.timeText)),
        createElement("div", { className: "fc-event-title" }, renderProps.event.title || createElement(Fragment, null, "\u00A0"))));
}
//# sourceMappingURL=TableListItemEvent.js.map