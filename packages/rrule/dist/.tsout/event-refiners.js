import { createDuration, identity } from '@fullcalendar/core/internal';
export const RRULE_EVENT_REFINERS = {
    rrule: identity,
    exrule: identity,
    exdate: identity,
    duration: createDuration,
};
//# sourceMappingURL=event-refiners.js.map