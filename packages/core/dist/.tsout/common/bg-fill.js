import { createElement } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
import { EventContainer } from './EventContainer.js';
export class BgEvent extends BaseComponent {
    render() {
        let { props } = this;
        let { seg } = props;
        return (createElement(EventContainer, { elTag: "div", elClasses: ['fc-bg-event'], elStyle: { backgroundColor: seg.eventRange.ui.backgroundColor }, defaultGenerator: renderInnerContent, seg: seg, timeText: "", isDragging: false, isResizing: false, isDateSelecting: false, isSelected: false, isPast: props.isPast, isFuture: props.isFuture, isToday: props.isToday, disableDragging: true, disableResizing: true }));
    }
}
function renderInnerContent(props) {
    let { title } = props.event;
    return title && (createElement("div", { className: "fc-event-title" }, props.event.title));
}
export function renderFill(fillType) {
    return (createElement("div", { className: `fc-${fillType}` }));
}
//# sourceMappingURL=bg-fill.js.map