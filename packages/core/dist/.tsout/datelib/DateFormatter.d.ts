import { DateMarker } from './marker.js';
import { CalendarSystem } from './calendar-system.js';
import { Locale } from './locale.js';
import { ZonedMarker, ExpandedZonedMarker } from './zoned-marker.js';
export interface VerboseFormattingArg {
    date: ExpandedZonedMarker;
    start: ExpandedZonedMarker;
    end?: ExpandedZonedMarker;
    timeZone: string;
    localeCodes: string[];
    defaultSeparator: string;
}
export declare function createVerboseFormattingArg(start: ZonedMarker, end: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): VerboseFormattingArg;
export type CmdFormatterFunc = (cmd: string, arg: VerboseFormattingArg) => string;
export interface DateFormattingContext {
    timeZone: string;
    locale: Locale;
    calendarSystem: CalendarSystem;
    computeWeekNumber: (d: DateMarker) => number;
    weekText: string;
    weekTextLong: string;
    cmdFormatter?: CmdFormatterFunc;
    defaultSeparator: string;
}
export interface DateFormatter {
    format(date: ZonedMarker, context: DateFormattingContext): string;
    formatRange(start: ZonedMarker, end: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): string;
}
//# sourceMappingURL=DateFormatter.d.ts.map