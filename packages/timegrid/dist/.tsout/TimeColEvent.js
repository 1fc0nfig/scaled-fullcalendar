import { StandardEvent, BaseComponent, createFormatter } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
const DEFAULT_TIME_FORMAT = createFormatter({
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false,
});
export class TimeColEvent extends BaseComponent {
    render() {
        return (createElement(StandardEvent, Object.assign({}, this.props, { elClasses: [
                'fc-timegrid-event',
                'fc-v-event',
                this.props.isShort && 'fc-timegrid-event-short',
            ], defaultTimeFormat: DEFAULT_TIME_FORMAT })));
    }
}
//# sourceMappingURL=TimeColEvent.js.map