import { createDuration } from '../datelib/duration.js';
import { identity } from '../options.js';
export const SIMPLE_RECURRING_REFINERS = {
    daysOfWeek: identity,
    startTime: createDuration,
    endTime: createDuration,
    duration: createDuration,
    startRecur: identity,
    endRecur: identity,
};
//# sourceMappingURL=recurring-event-simple-refiners.js.map