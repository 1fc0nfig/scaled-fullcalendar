import { StandardEvent, BaseComponent } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
import { DEFAULT_TABLE_EVENT_TIME_FORMAT } from './event-rendering.js';
export class TableBlockEvent extends BaseComponent {
    render() {
        let { props } = this;
        return (createElement(StandardEvent, Object.assign({}, props, { elClasses: ['fc-daygrid-event', 'fc-daygrid-block-event', 'fc-h-event'], defaultTimeFormat: DEFAULT_TABLE_EVENT_TIME_FORMAT, defaultDisplayEventEnd: props.defaultDisplayEventEnd, disableResizing: !props.seg.eventRange.def.allDay })));
    }
}
//# sourceMappingURL=TableBlockEvent.js.map