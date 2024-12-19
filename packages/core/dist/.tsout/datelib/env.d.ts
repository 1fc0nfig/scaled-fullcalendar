import { DateMarker } from './marker.js';
import { CalendarSystem } from './calendar-system.js';
import { Locale } from './locale.js';
import { NamedTimeZoneImpl, NamedTimeZoneImplClass } from './timezone.js';
import { Duration } from './duration.js';
import { DateFormatter, CmdFormatterFunc } from './DateFormatter.js';
export type WeekNumberCalculation = 'local' | 'ISO' | ((m: Date) => number);
export interface DateEnvSettings {
    timeZone: string;
    namedTimeZoneImpl?: NamedTimeZoneImplClass;
    calendarSystem: string;
    locale: Locale;
    weekNumberCalculation?: WeekNumberCalculation;
    firstDay?: number;
    weekText?: string;
    weekTextLong?: string;
    cmdFormatter?: CmdFormatterFunc;
    defaultSeparator?: string;
}
export type DateInput = Date | string | number | number[];
export interface DateMarkerMeta {
    marker: DateMarker;
    isTimeUnspecified: boolean;
    forcedTzo: number | null;
}
export declare class DateEnv {
    timeZone: string;
    namedTimeZoneImpl: NamedTimeZoneImpl;
    canComputeOffset: boolean;
    calendarSystem: CalendarSystem;
    locale: Locale;
    weekDow: number;
    weekDoy: number;
    weekNumberFunc: any;
    weekText: string;
    weekTextLong: string;
    cmdFormatter?: CmdFormatterFunc;
    defaultSeparator: string;
    constructor(settings: DateEnvSettings);
    createMarker(input: DateInput): DateMarker;
    createNowMarker(): DateMarker;
    createMarkerMeta(input: DateInput): DateMarkerMeta;
    parse(s: string): {
        marker: Date;
        isTimeUnspecified: boolean;
        forcedTzo: any;
    };
    getYear(marker: DateMarker): number;
    getMonth(marker: DateMarker): number;
    getDay(marker: DateMarker): number;
    add(marker: DateMarker, dur: Duration): DateMarker;
    subtract(marker: DateMarker, dur: Duration): DateMarker;
    addYears(marker: DateMarker, n: number): Date;
    addMonths(marker: DateMarker, n: number): Date;
    diffWholeYears(m0: DateMarker, m1: DateMarker): number;
    diffWholeMonths(m0: DateMarker, m1: DateMarker): number;
    greatestWholeUnit(m0: DateMarker, m1: DateMarker): {
        unit: string;
        value: number;
    };
    countDurationsBetween(m0: DateMarker, m1: DateMarker, d: Duration): number;
    startOf(m: DateMarker, unit: string): Date;
    startOfYear(m: DateMarker): DateMarker;
    startOfMonth(m: DateMarker): DateMarker;
    startOfWeek(m: DateMarker): DateMarker;
    computeWeekNumber(marker: DateMarker): number;
    format(marker: DateMarker, formatter: DateFormatter, dateOptions?: {
        forcedTzo?: number;
    }): string;
    formatRange(start: DateMarker, end: DateMarker, formatter: DateFormatter, dateOptions?: {
        forcedStartTzo?: number;
        forcedEndTzo?: number;
        isEndExclusive?: boolean;
        defaultSeparator?: string;
    }): string;
    formatIso(marker: DateMarker, extraOptions?: any): string;
    timestampToMarker(ms: number): Date;
    offsetForMarker(m: DateMarker): number;
    toDate(m: DateMarker, forcedTzo?: number): Date;
}
//# sourceMappingURL=env.d.ts.map