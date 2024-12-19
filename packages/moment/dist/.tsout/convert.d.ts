import moment from 'moment';
import { CalendarApi, Duration } from '@fullcalendar/core';
export declare function toMoment(date: Date, calendar: CalendarApi): moment.Moment;
export declare function toMomentDuration(fcDuration: Duration): moment.Duration;
export declare function convertToMoment(input: any, timeZone: string, timeZoneOffset: number | null, locale: string): moment.Moment;
//# sourceMappingURL=convert.d.ts.map