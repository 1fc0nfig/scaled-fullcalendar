import { DateFormatter, DateFormattingContext, VerboseFormattingArg } from './DateFormatter.js';
import { ZonedMarker } from './zoned-marker.js';
export type FuncFormatterFunc = (arg: VerboseFormattingArg) => string;
export declare class FuncFormatter implements DateFormatter {
    func: FuncFormatterFunc;
    constructor(func: FuncFormatterFunc);
    format(date: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): string;
    formatRange(start: ZonedMarker, end: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): string;
}
//# sourceMappingURL=formatting-func.d.ts.map