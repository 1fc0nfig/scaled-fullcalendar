import { createFormatter } from '@fullcalendar/core/internal';
export const DEFAULT_TABLE_EVENT_TIME_FORMAT = createFormatter({
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: true,
    meridiem: 'narrow',
});
export function hasListItemDisplay(seg) {
    let { display } = seg.eventRange.ui;
    return display === 'list-item' || (display === 'auto' &&
        !seg.eventRange.def.allDay &&
        seg.firstCol === seg.lastCol && // can't be multi-day
        seg.isStart && // "
        seg.isEnd // "
    );
}
//# sourceMappingURL=event-rendering.js.map