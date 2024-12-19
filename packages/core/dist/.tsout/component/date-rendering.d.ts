import { DateMarker } from '../datelib/marker.js';
import { DateRange } from '../datelib/date-range.js';
import { DateProfile } from '../DateProfileGenerator.js';
import { Theme } from '../theme/Theme.js';
export interface DateMeta {
    dow: number;
    isDisabled: boolean;
    isOther: boolean;
    isToday: boolean;
    isPast: boolean;
    isFuture: boolean;
}
export declare function getDateMeta(date: DateMarker, todayRange?: DateRange, nowDate?: DateMarker, dateProfile?: DateProfile): DateMeta;
export declare function getDayClassNames(meta: DateMeta, theme: Theme): string[];
export declare function getSlotClassNames(meta: DateMeta, theme: Theme): string[];
//# sourceMappingURL=date-rendering.d.ts.map