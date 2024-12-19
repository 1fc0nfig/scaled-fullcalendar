import { Calendar } from '@fullcalendar/core';
import { ViewWrapper } from './ViewWrapper.js';
import { DayGridWrapper } from './DayGridWrapper.js';
import { DayHeaderWrapper } from './DayHeaderWrapper.js';
export declare class DayGridViewWrapper extends ViewWrapper {
    constructor(calendar: Calendar);
    get header(): DayHeaderWrapper;
    get dayGrid(): DayGridWrapper;
    getScrollerEl(): HTMLElement;
}
//# sourceMappingURL=DayGridViewWrapper.d.ts.map