import { createDuration } from '../datelib/duration.js';
import { DateInput } from '../datelib/env.js';
import { Identity } from '../options.js';
export declare const SIMPLE_RECURRING_REFINERS: {
    daysOfWeek: Identity<number[]>;
    startTime: typeof createDuration;
    endTime: typeof createDuration;
    duration: typeof createDuration;
    startRecur: Identity<DateInput>;
    endRecur: Identity<DateInput>;
};
//# sourceMappingURL=recurring-event-simple-refiners.d.ts.map