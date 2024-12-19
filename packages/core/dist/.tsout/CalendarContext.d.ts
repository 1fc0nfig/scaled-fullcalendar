import { DateEnv } from './datelib/env.js';
import { BaseOptionsRefined, CalendarListeners } from './options.js';
import { PluginHooks } from './plugin-system-struct.js';
import { Emitter } from './common/Emitter.js';
import { Action } from './reducers/Action.js';
import { CalendarImpl } from './api/CalendarImpl.js';
import { CalendarData } from './reducers/data-types.js';
export interface CalendarContext {
    dateEnv: DateEnv;
    options: BaseOptionsRefined;
    pluginHooks: PluginHooks;
    emitter: Emitter<CalendarListeners>;
    dispatch(action: Action): void;
    getCurrentData(): CalendarData;
    calendarApi: CalendarImpl;
}
//# sourceMappingURL=CalendarContext.d.ts.map