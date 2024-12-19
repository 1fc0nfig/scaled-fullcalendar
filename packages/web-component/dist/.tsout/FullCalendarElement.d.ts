import { Calendar, CalendarApi, CalendarOptions } from '@fullcalendar/core';
export declare class FullCalendarElement extends HTMLElement {
    _calendar: Calendar | null;
    _options: CalendarOptions | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    get options(): CalendarOptions;
    set options(options: CalendarOptions | null);
    getApi(): CalendarApi | null;
    _handleOptionsStr(optionsStr: string | null): void;
    _handleOptions(options: CalendarOptions | null): void;
    static get observedAttributes(): string[];
}
//# sourceMappingURL=FullCalendarElement.d.ts.map