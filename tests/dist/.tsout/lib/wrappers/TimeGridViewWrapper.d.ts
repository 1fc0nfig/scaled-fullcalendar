import { ViewWrapper } from './ViewWrapper.js';
import { TimeGridWrapper } from './TimeGridWrapper.js';
import { DayGridWrapper } from './DayGridWrapper.js';
import { DayHeaderWrapper } from './DayHeaderWrapper.js';
export declare class TimeGridViewWrapper extends ViewWrapper {
    constructor(calendar: any);
    get header(): DayHeaderWrapper;
    get timeGrid(): TimeGridWrapper;
    get dayGrid(): DayGridWrapper;
    getScrollerEl(): HTMLElement;
    getHeaderAxisEl(): Element;
    getHeaderWeekNumberLink(): HTMLAnchorElement;
    getHeaderWeekText(): string;
    getAllDayAxisEl(): Element;
    getAllDayAxisElText(): string;
}
//# sourceMappingURL=TimeGridViewWrapper.d.ts.map