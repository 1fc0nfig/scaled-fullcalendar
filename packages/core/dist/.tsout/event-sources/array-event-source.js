import { createPlugin } from '../plugin-system.js';
let eventSourceDef = {
    ignoreRange: true,
    parseMeta(refined) {
        if (Array.isArray(refined.events)) {
            return refined.events;
        }
        return null;
    },
    fetch(arg, successCallback) {
        successCallback({
            rawEvents: arg.eventSource.meta,
        });
    },
};
export const arrayEventSourcePlugin = createPlugin({
    name: 'array-event-source',
    eventSourceDefs: [eventSourceDef],
});
//# sourceMappingURL=array-event-source.js.map