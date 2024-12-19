import { DateRange } from '../datelib/date-range.js';
import { DateEnv } from '../datelib/env.js';
import { Duration } from '../datelib/duration.js';
import { DateMarker } from '../datelib/marker.js';
import { EventStore } from './event-store.js';
import { CalendarContext } from '../CalendarContext.js';
import { EventRefined } from './event-parse.js';
export interface ParsedRecurring<RecurringData> {
    typeData: RecurringData;
    allDayGuess: boolean | null;
    duration: Duration | null;
}
export interface RecurringType<RecurringData> {
    parse: (refined: EventRefined, dateEnv: DateEnv) => ParsedRecurring<RecurringData> | null;
    expand: (typeData: any, framingRange: DateRange, dateEnv: DateEnv) => DateMarker[];
}
export declare function parseRecurring(refined: EventRefined, defaultAllDay: boolean | null, dateEnv: DateEnv, recurringTypes: RecurringType<any>[]): {
    allDay: boolean;
    duration: Duration;
    typeData: any;
    typeId: number;
};
export declare function expandRecurring(eventStore: EventStore, framingRange: DateRange, context: CalendarContext): EventStore;
//# sourceMappingURL=recurring-event.d.ts.map