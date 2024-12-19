import { EventStore } from './event-store.js';
import { EventInput } from './event-parse.js';
import { DateSpanApi } from './date-span.js';
import { EventImpl } from '../api/EventImpl.js';
import { SplittableProps } from '../component/event-splitting.js';
import { CalendarContext } from '../CalendarContext.js';
export type ConstraintInput = 'businessHours' | string | EventInput | EventInput[];
export type Constraint = 'businessHours' | string | EventStore | false;
export type OverlapFunc = ((stillEvent: EventImpl, movingEvent: EventImpl | null) => boolean);
export type AllowFunc = (span: DateSpanApi, movingEvent: EventImpl | null) => boolean;
export type isPropsValidTester = (props: SplittableProps, context: CalendarContext) => boolean;
export declare function normalizeConstraint(input: ConstraintInput, context: CalendarContext): Constraint | null;
//# sourceMappingURL=constraint.d.ts.map