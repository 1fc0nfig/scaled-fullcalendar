import { OPTION_REFINERS } from './options-refiners.js';
import '@fullcalendar/daygrid';
type ExtraOptionRefiners = typeof OPTION_REFINERS;
declare module '@fullcalendar/core/internal' {
    interface BaseOptionRefiners extends ExtraOptionRefiners {
    }
}
export {};
//# sourceMappingURL=ambient.d.ts.map