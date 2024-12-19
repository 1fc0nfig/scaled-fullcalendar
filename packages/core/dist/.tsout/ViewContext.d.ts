import { CalendarImpl } from './api/CalendarImpl.js';
import { ViewImpl } from './api/ViewImpl.js';
import { Theme } from './theme/Theme.js';
import { DateEnv } from './datelib/env.js';
import { PluginHooks } from './plugin-system-struct.js';
import { Context } from './preact.js';
import { ScrollResponder, ScrollRequestHandler } from './ScrollResponder.js';
import { DateProfileGenerator } from './DateProfileGenerator.js';
import { ViewSpec } from './structs/view-spec.js';
import { CalendarData } from './reducers/data-types.js';
import { Action } from './reducers/Action.js';
import { Emitter } from './common/Emitter.js';
import { InteractionSettingsInput } from './interactions/interaction.js';
import { DateComponent } from './component/DateComponent.js';
import { CalendarContext } from './CalendarContext.js';
import { ViewOptionsRefined, CalendarListeners } from './options.js';
export declare const ViewContextType: Context<any>;
export type ResizeHandler = (force: boolean) => void;
export interface ViewContext extends CalendarContext {
    options: ViewOptionsRefined;
    theme: Theme;
    isRtl: boolean;
    dateProfileGenerator: DateProfileGenerator;
    viewSpec: ViewSpec;
    viewApi: ViewImpl;
    addResizeHandler: (handler: ResizeHandler) => void;
    removeResizeHandler: (handler: ResizeHandler) => void;
    createScrollResponder: (execFunc: ScrollRequestHandler) => ScrollResponder;
    registerInteractiveComponent: (component: DateComponent<any>, settingsInput: InteractionSettingsInput) => void;
    unregisterInteractiveComponent: (component: DateComponent<any>) => void;
}
export declare function buildViewContext(viewSpec: ViewSpec, viewApi: ViewImpl, viewOptions: ViewOptionsRefined, dateProfileGenerator: DateProfileGenerator, dateEnv: DateEnv, theme: Theme, pluginHooks: PluginHooks, dispatch: (action: Action) => void, getCurrentData: () => CalendarData, emitter: Emitter<CalendarListeners>, calendarApi: CalendarImpl, registerInteractiveComponent: (component: DateComponent<any>, settingsInput: InteractionSettingsInput) => void, unregisterInteractiveComponent: (component: DateComponent<any>) => void): ViewContext;
//# sourceMappingURL=ViewContext.d.ts.map