import { DateRange } from '../datelib/date-range.js';
import { EventStore } from '../structs/event-store.js';
import { EventUiHash } from '../component/event-ui.js';
import { DateProfile } from '../DateProfileGenerator.js';
import { Seg, EventSegUiInteractionState } from '../component/DateComponent.js';
import { DateSpan } from '../structs/date-span.js';
import { EventInteractionState } from '../interactions/event-interaction-state.js';
import { Duration } from '../datelib/duration.js';
import { DateMarker } from '../datelib/marker.js';
import { CalendarContext } from '../CalendarContext.js';
export interface SliceableProps {
    dateSelection: DateSpan;
    businessHours: EventStore;
    eventStore: EventStore;
    eventDrag: EventInteractionState | null;
    eventResize: EventInteractionState | null;
    eventSelection: string;
    eventUiBases: EventUiHash;
}
export interface SlicedProps<SegType extends Seg> {
    dateSelectionSegs: SegType[];
    businessHourSegs: SegType[];
    fgEventSegs: SegType[];
    bgEventSegs: SegType[];
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    eventSelection: string;
}
export declare abstract class Slicer<SegType extends Seg, ExtraArgs extends any[] = []> {
    private sliceBusinessHours;
    private sliceDateSelection;
    private sliceEventStore;
    private sliceEventDrag;
    private sliceEventResize;
    abstract sliceRange(dateRange: DateRange, ...extraArgs: ExtraArgs): SegType[];
    protected forceDayIfListItem: boolean;
    sliceProps(props: SliceableProps, dateProfile: DateProfile, nextDayThreshold: Duration | null, context: CalendarContext, ...extraArgs: ExtraArgs): SlicedProps<SegType>;
    sliceNowDate(// does not memoize
    date: DateMarker, dateProfile: DateProfile, nextDayThreshold: Duration | null, context: CalendarContext, ...extraArgs: ExtraArgs): SegType[];
    private _sliceBusinessHours;
    private _sliceEventStore;
    private _sliceInteraction;
    private _sliceDateSpan;
    private sliceEventRanges;
    private sliceEventRange;
}
//# sourceMappingURL=slicing-utils.d.ts.map