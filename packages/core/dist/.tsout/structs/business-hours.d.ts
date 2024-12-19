import { EventInput } from './event-parse.js';
import { EventStore } from './event-store.js';
import { CalendarContext } from '../CalendarContext.js';
export type BusinessHoursInput = boolean | EventInput | EventInput[];
export declare function parseBusinessHours(input: BusinessHoursInput, context: CalendarContext): EventStore;
//# sourceMappingURL=business-hours.d.ts.map