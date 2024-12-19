import { buildEventApis } from './api/EventImpl.js';
export function handleEventStore(eventStore, context) {
    let { emitter } = context;
    if (emitter.hasHandlers('eventsSet')) {
        emitter.trigger('eventsSet', buildEventApis(eventStore, context));
    }
}
//# sourceMappingURL=event-crud.js.map