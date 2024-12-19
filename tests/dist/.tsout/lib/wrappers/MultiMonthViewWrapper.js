import { findElements } from '@fullcalendar/core/internal';
import { ViewWrapper } from './ViewWrapper.js';
import { DayGridWrapper } from './DayGridWrapper.js';
export class MultiMonthViewWrapper extends ViewWrapper {
    constructor(calendar) {
        super(calendar, 'fc-multimonth');
    }
    getMonths() {
        const monthEls = findElements(this.el, '.fc-multimonth-month');
        return monthEls.map((monthEl) => ({
            el: monthEl,
            title: monthEl.querySelector('.fc-multimonth-title').innerText,
            columnCnt: monthEl.querySelectorAll('th').length,
        }));
    }
    getDayGrid(i) {
        const dayGridEls = findElements(this.el, '.fc-multimonth-daygrid');
        return new DayGridWrapper(dayGridEls[i]);
    }
    getEventEls() {
        return findElements(this.el, '.fc-daygrid-event');
    }
    getScrollerEl() {
        return this.el; // the view itself
    }
}
//# sourceMappingURL=MultiMonthViewWrapper.js.map