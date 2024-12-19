import { createContext } from './preact.js';
import { ScrollResponder } from './ScrollResponder.js';
import { createDuration } from './datelib/duration.js';
export const ViewContextType = createContext({}); // for Components
export function buildViewContext(viewSpec, viewApi, viewOptions, dateProfileGenerator, dateEnv, theme, pluginHooks, dispatch, getCurrentData, emitter, calendarApi, registerInteractiveComponent, unregisterInteractiveComponent) {
    return {
        dateEnv,
        options: viewOptions,
        pluginHooks,
        emitter,
        dispatch,
        getCurrentData,
        calendarApi,
        viewSpec,
        viewApi,
        dateProfileGenerator,
        theme,
        isRtl: viewOptions.direction === 'rtl',
        addResizeHandler(handler) {
            emitter.on('_resize', handler);
        },
        removeResizeHandler(handler) {
            emitter.off('_resize', handler);
        },
        createScrollResponder(execFunc) {
            return new ScrollResponder(execFunc, emitter, createDuration(viewOptions.scrollTime), viewOptions.scrollTimeReset);
        },
        registerInteractiveComponent,
        unregisterInteractiveComponent,
    };
}
//# sourceMappingURL=ViewContext.js.map