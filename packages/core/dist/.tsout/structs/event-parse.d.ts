import { DateInput } from '../datelib/env.js';
import { CalendarContext } from '../CalendarContext.js';
import { EventDef } from './event-def.js';
import { EventInstance } from './event-instance.js';
import { EventSource } from './event-source.js';
import { RefinedOptionsFromRefiners, RawOptionsFromRefiners, Identity, Dictionary, GenericRefiners } from '../options.js';
import { EventUiInput, EventUiRefined } from '../component/event-ui.js';
import { EventDefIdMap, EventInstanceIdMap } from '../reducers/eventStore.js';
export declare const EVENT_NON_DATE_REFINERS: {
    id: StringConstructor;
    groupId: StringConstructor;
    title: StringConstructor;
    url: StringConstructor;
    interactive: BooleanConstructor;
};
export declare const EVENT_DATE_REFINERS: {
    start: Identity<DateInput>;
    end: Identity<DateInput>;
    date: Identity<DateInput>;
    allDay: BooleanConstructor;
};
declare const EVENT_REFINERS: {
    extendedProps: Identity<Dictionary>;
    start: Identity<DateInput>;
    end: Identity<DateInput>;
    date: Identity<DateInput>;
    allDay: BooleanConstructor;
    id: StringConstructor;
    groupId: StringConstructor;
    title: StringConstructor;
    url: StringConstructor;
    interactive: BooleanConstructor;
};
type BuiltInEventRefiners = typeof EVENT_REFINERS;
export interface EventRefiners extends BuiltInEventRefiners {
}
export type EventInput = EventUiInput & RawOptionsFromRefiners<Required<EventRefiners>> & // Required hack
{
    [extendedProp: string]: any;
};
export type EventRefined = EventUiRefined & RefinedOptionsFromRefiners<Required<EventRefiners>>;
export interface EventTuple {
    def: EventDef;
    instance: EventInstance | null;
}
export type EventInputTransformer = (input: EventInput) => EventInput;
export type EventDefMemberAdder = (refined: EventRefined) => Partial<EventDef>;
export declare function parseEvent(raw: EventInput, eventSource: EventSource<any> | null, context: CalendarContext, allowOpenRange: boolean, refiners?: GenericRefiners, defIdMap?: EventDefIdMap, instanceIdMap?: EventInstanceIdMap): EventTuple | null;
export declare function refineEventDef(raw: EventInput, context: CalendarContext, refiners?: GenericRefiners): {
    refined: RefinedOptionsFromRefiners<GenericRefiners>;
    extra: Dictionary;
};
export declare function buildEventRefiners(context: CalendarContext): GenericRefiners;
export declare function parseEventDef(refined: EventRefined, extra: Dictionary, sourceId: string, allDay: boolean, hasEnd: boolean, context: CalendarContext, defIdMap?: EventDefIdMap): EventDef;
export {};
//# sourceMappingURL=event-parse.d.ts.map