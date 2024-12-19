import { DateMarker } from '../datelib/marker.js';
import { Duration } from '../datelib/duration.js';
import { DateEnv } from '../datelib/env.js';
import { DateRange, OpenDateRange } from '../datelib/date-range.js';
export declare function computeAlignedDayRange(timedRange: DateRange): DateRange;
export declare function computeVisibleDayRange(timedRange: OpenDateRange, nextDayThreshold?: Duration): OpenDateRange;
export declare function isMultiDayRange(range: DateRange): boolean;
export declare function diffDates(date0: DateMarker, date1: DateMarker, dateEnv: DateEnv, largeUnit?: string): Duration;
//# sourceMappingURL=date.d.ts.map