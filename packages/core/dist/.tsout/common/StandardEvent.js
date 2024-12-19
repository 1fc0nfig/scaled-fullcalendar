import { createElement, Fragment } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
import { buildSegTimeText, getSegAnchorAttrs } from '../component/event-rendering.js';
import { EventContainer } from './EventContainer.js';
// should not be a purecomponent
export class StandardEvent extends BaseComponent {
    render() {
        let { props, context } = this;
        let { options } = context;
        let { seg } = props;
        let { ui } = seg.eventRange;
        let timeFormat = options.eventTimeFormat || props.defaultTimeFormat;
        let timeText = buildSegTimeText(seg, timeFormat, context, props.defaultDisplayEventTime, props.defaultDisplayEventEnd);
        return (createElement(EventContainer, Object.assign({}, props /* includes elRef */, { elTag: "a", elStyle: {
                borderColor: ui.borderColor,
                backgroundColor: ui.backgroundColor,
            }, elAttrs: getSegAnchorAttrs(seg, context), defaultGenerator: renderInnerContent, timeText: timeText }), (InnerContent, eventContentArg) => (createElement(Fragment, null,
            createElement(InnerContent, { elTag: "div", elClasses: ['fc-event-main'], elStyle: { color: eventContentArg.textColor } }),
            Boolean(eventContentArg.isStartResizable) && (createElement("div", { className: "fc-event-resizer fc-event-resizer-start" })),
            Boolean(eventContentArg.isEndResizable) && (createElement("div", { className: "fc-event-resizer fc-event-resizer-end" }))))));
    }
}
function renderInnerContent(innerProps) {
    return (createElement("div", { className: "fc-event-main-frame" },
        innerProps.timeText && (createElement("div", { className: "fc-event-time" }, innerProps.timeText)),
        createElement("div", { className: "fc-event-title-container" },
            createElement("div", { className: "fc-event-title fc-sticky" }, innerProps.event.title || createElement(Fragment, null, "\u00A0")))));
}
//# sourceMappingURL=StandardEvent.js.map