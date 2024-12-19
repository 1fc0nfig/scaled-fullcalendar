import { EventDef } from '../structs/event-def.js';
import { EventInstance } from '../structs/event-instance.js';
import { EventMutation } from '../structs/event-mutation.js';
import { CalendarContext } from '../CalendarContext.js';
import { EventStore } from '../structs/event-store.js';
import { Dictionary } from '../options.js';
import { EventApi } from './EventApi.js';
import { EventSourceImpl } from './EventSourceImpl.js';
import { DateInput, DurationInput, FormatterInput } from './structs.js';
export declare class EventImpl implements EventApi {
    _context: CalendarContext;
    _def: EventDef;
    _instance: EventInstance | null;
    constructor(context: CalendarContext, def: EventDef, instance?: EventInstance);
    setProp(name: string, val: any): void;
    setExtendedProp(name: string, val: any): void;
    setStart(startInput: DateInput, options?: {
        granularity?: string;
        maintainDuration?: boolean;
    }): void;
    setEnd(endInput: DateInput | null, options?: {
        granularity?: string;
    }): void;
    setDates(startInput: DateInput, endInput: DateInput | null, options?: {
        allDay?: boolean;
        granularity?: string;
    }): void;
    moveStart(deltaInput: DurationInput): void;
    moveEnd(deltaInput: DurationInput): void;
    moveDates(deltaInput: DurationInput): void;
    setAllDay(allDay: boolean, options?: {
        maintainDuration?: boolean;
    }): void;
    formatRange(formatInput: FormatterInput): string;
    mutate(mutation: EventMutation): void;
    remove(): void;
    get source(): EventSourceImpl | null;
    get start(): Date | null;
    get end(): Date | null;
    get startStr(): string;
    get endStr(): string;
    get id(): string;
    get groupId(): string;
    get allDay(): boolean;
    get title(): string;
    get url(): string;
    get display(): string;
    get startEditable(): boolean;
    get durationEditable(): boolean;
    get constraint(): string | EventStore;
    get overlap(): boolean;
    get allow(): import("./structs.js").AllowFunc;
    get backgroundColor(): string;
    get borderColor(): string;
    get textColor(): string;
    get classNames(): string[];
    get extendedProps(): Dictionary;
    toPlainObject(settings?: {
        collapseExtendedProps?: boolean;
        collapseColor?: boolean;
    }): Dictionary;
    toJSON(): Dictionary;
}
export declare function eventApiToStore(eventApi: EventImpl): EventStore;
export declare function buildEventApis(eventStore: EventStore, context: CalendarContext, excludeInstance?: EventInstance): EventImpl[];
//# sourceMappingURL=EventImpl.d.ts.map