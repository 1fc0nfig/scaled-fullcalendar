import { DateMarker } from './marker.js';
import { CalendarSystem } from './calendar-system.js';
export interface ZonedMarker {
    marker: DateMarker;
    timeZoneOffset: number;
}
export interface ExpandedZonedMarker extends ZonedMarker {
    array: number[];
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
}
export declare function expandZonedMarker(dateInfo: ZonedMarker, calendarSystem: CalendarSystem): ExpandedZonedMarker;
//# sourceMappingURL=zoned-marker.d.ts.map