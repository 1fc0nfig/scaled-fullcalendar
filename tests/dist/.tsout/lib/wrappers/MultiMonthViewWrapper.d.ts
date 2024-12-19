import { Calendar } from '@fullcalendar/core';
import { ViewWrapper } from './ViewWrapper.js';
import { DayGridWrapper } from './DayGridWrapper.js';
export declare class MultiMonthViewWrapper extends ViewWrapper {
    constructor(calendar: Calendar);
    getMonths(): {
        el: HTMLElement;
        title: string;
        columnCnt: number;
    }[];
    getDayGrid(i: any): DayGridWrapper;
    getEventEls(): HTMLElement[];
    getScrollerEl(): HTMLElement;
}
//# sourceMappingURL=MultiMonthViewWrapper.d.ts.map