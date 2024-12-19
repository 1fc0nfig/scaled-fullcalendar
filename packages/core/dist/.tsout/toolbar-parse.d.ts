import { ViewSpecHash } from './structs/view-spec.js';
import { Theme } from './theme/Theme.js';
import { CalendarImpl } from './api/CalendarImpl.js';
import { CalendarOptionsRefined, CalendarOptions } from './options.js';
import { ToolbarModel } from './toolbar-struct.js';
export declare function parseToolbars(calendarOptions: CalendarOptionsRefined, calendarOptionOverrides: CalendarOptions, theme: Theme, viewSpecs: ViewSpecHash, calendarApi: CalendarImpl): {
    header: ToolbarModel;
    footer: ToolbarModel;
};
//# sourceMappingURL=toolbar-parse.d.ts.map