import { NativeFormatterOptions } from './formatting-native.js';
import { FuncFormatterFunc } from './formatting-func.js';
import { DateFormatter } from './DateFormatter.js';
export type FormatterInput = NativeFormatterOptions | string | FuncFormatterFunc;
export declare function createFormatter(input: FormatterInput): DateFormatter;
//# sourceMappingURL=formatting.d.ts.map