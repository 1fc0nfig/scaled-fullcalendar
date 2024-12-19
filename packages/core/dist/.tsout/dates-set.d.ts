import { DateProfile } from './DateProfileGenerator.js';
import { CalendarData } from './reducers/data-types.js';
import { RangeApiWithTimeZone } from './structs/date-span.js';
import { ViewApi } from './api/ViewApi.js';
export type DatesSetArg = RangeApiWithTimeZone & {
    view: ViewApi;
};
export declare function handleDateProfile(dateProfile: DateProfile, context: CalendarData): void;
//# sourceMappingURL=dates-set.d.ts.map