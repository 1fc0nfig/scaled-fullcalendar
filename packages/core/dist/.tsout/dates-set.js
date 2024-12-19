import { buildRangeApiWithTimeZone } from './structs/date-span.js';
export function handleDateProfile(dateProfile, context) {
    context.emitter.trigger('datesSet', Object.assign(Object.assign({}, buildRangeApiWithTimeZone(dateProfile.activeRange, context.dateEnv)), { view: context.viewApi }));
}
//# sourceMappingURL=dates-set.js.map