import { CalendarApi, Duration } from '@fullcalendar/core';
import { DateTime as LuxonDateTime, Duration as LuxonDuration } from 'luxon';
export declare function toLuxonDateTime(date: Date, calendar: CalendarApi): LuxonDateTime;
export declare function toLuxonDuration(duration: Duration, calendar: CalendarApi): LuxonDuration;
export declare function luxonToArray(datetime: LuxonDateTime): number[];
export declare function arrayToLuxon(arr: number[], timeZone: string, locale?: string): LuxonDateTime;
//# sourceMappingURL=convert.d.ts.map