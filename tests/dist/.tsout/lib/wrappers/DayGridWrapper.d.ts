export declare class DayGridWrapper {
    private el;
    static EVENT_IS_START_CLASSNAME: string;
    static EVENT_IS_END_CLASSNAME: string;
    constructor(el: HTMLElement);
    getRootTableEl(): HTMLElement;
    getAllDayEls(): HTMLElement[];
    getMirrorEls(): HTMLElement[];
    getDayEl(date: any): Element;
    getDayEls(date: any): HTMLElement[];
    getDayNumberText(date: any): string;
    getDayElsInRow(row: any): HTMLElement[];
    getNonBusinessDayEls(): HTMLElement[];
    getDowEls(dayAbbrev: any): HTMLElement[];
    getMonthStartEls(): HTMLElement[];
    getDisabledDayEls(): HTMLElement[];
    getMoreEl(): Element;
    getMoreEls(): HTMLElement[];
    getWeekNavLinkEls(): HTMLElement[];
    getWeekNumberEls(): HTMLElement[];
    getWeekNumberEl(rowIndex: any): Element;
    getWeekNumberText(rowIndex: any): string;
    getNavLinkEl(date: any): Element;
    clickNavLink(date: any): void;
    openMorePopover(index?: any): void;
    getMorePopoverEl(): HTMLElement;
    getMorePopoverHeaderEl(): HTMLElement;
    getMorePopoverEventEls(): HTMLElement[];
    getMorePopoverEventCnt(): number;
    getMorePopoverEventTitles(): string[];
    getMorePopoverBgEventCnt(): number;
    closeMorePopover(): void;
    getMorePopoverTitle(): string;
    getRowEl(i: any): HTMLElement;
    getRowEls(): HTMLElement[];
    getBgEventEls(row?: any): HTMLElement[];
    getEventEls(): HTMLElement[];
    isEventListItem(el: HTMLElement): boolean;
    getFirstEventEl(): HTMLElement;
    getHighlightEls(): HTMLElement[];
    static getEventElInfo(eventEl: any): {
        title: string;
        timeText: string;
    };
    clickDate(date: any): void;
    selectDates(start: any, inclusiveEnd: any): Promise<void>;
    selectDatesTouch(start: any, inclusiveEnd: any, debug?: boolean): Promise<void>;
    dragEventToDate(eventEl: HTMLElement, startDate: any, endDate: any, isTouch?: any, onBeforeRelease?: any): Promise<void>;
    resizeEvent(eventEl: HTMLElement, origEndDate: any, newEndDate: any, fromStart?: any, onBeforeRelease?: any): Promise<void>;
    resizeEventTouch(eventEl: HTMLElement, origEndDate: any, newEndDate: any, fromStart?: any): Promise<void>;
}
//# sourceMappingURL=DayGridWrapper.d.ts.map