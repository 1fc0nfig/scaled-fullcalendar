import { DateSpan } from './structs/date-span.js';
import { EventInteractionState } from './interactions/event-interaction-state.js';
import { SplittableProps } from './component/event-splitting.js';
import { CalendarContext } from './CalendarContext.js';
import { DateProfile } from './DateProfileGenerator.js';
export declare function isInteractionValid(interaction: EventInteractionState, dateProfile: DateProfile, context: CalendarContext): boolean;
export declare function isDateSelectionValid(dateSelection: DateSpan, dateProfile: DateProfile, context: CalendarContext): boolean;
export declare function isPropsValid(state: SplittableProps, context: CalendarContext, dateSpanMeta?: {}, filterConfig?: any): boolean;
//# sourceMappingURL=validation.d.ts.map