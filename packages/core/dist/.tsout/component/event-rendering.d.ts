import { EventDef, EventDefHash } from '../structs/event-def.js';
import { EventTuple } from '../structs/event-parse.js';
import { EventStore } from '../structs/event-store.js';
import { DateRange } from '../datelib/date-range.js';
import { Duration } from '../datelib/duration.js';
import { OrderSpec } from '../util/misc.js';
import { Seg } from './DateComponent.js';
import { EventImpl } from '../api/EventImpl.js';
import { EventUi, EventUiHash } from './event-ui.js';
import { ViewContext } from '../ViewContext.js';
import { DateFormatter } from '../datelib/DateFormatter.js';
import { DateMarker } from '../datelib/marker.js';
import { ViewApi } from '../api/ViewApi.js';
import { MountArg } from '../common/render-hook.js';
export interface EventRenderRange extends EventTuple {
    ui: EventUi;
    range: DateRange;
    isStart: boolean;
    isEnd: boolean;
}
export declare function sliceEventStore(eventStore: EventStore, eventUiBases: EventUiHash, framingRange: DateRange, nextDayThreshold?: Duration): {
    bg: EventRenderRange[];
    fg: EventRenderRange[];
};
export declare function hasBgRendering(def: EventDef): boolean;
export declare function setElSeg(el: HTMLElement, seg: Seg): void;
export declare function getElSeg(el: HTMLElement): Seg | null;
export declare function compileEventUis(eventDefs: EventDefHash, eventUiBases: EventUiHash): {
    [key: string]: EventUi;
};
export declare function compileEventUi(eventDef: EventDef, eventUiBases: EventUiHash): EventUi;
export declare function sortEventSegs(segs: any, eventOrderSpecs: OrderSpec<EventImpl>[]): Seg[];
export declare function buildSegCompareObj(seg: Seg): {
    id: string;
    start: number;
    end: number;
    duration: number;
    allDay: number;
    _seg: Seg;
    defId: string;
    sourceId: string;
    publicId: string;
    groupId: string;
    hasEnd: boolean;
    recurringDef: {
        typeId: number;
        typeData: any;
        duration: Duration;
    };
    title: string;
    url: string;
    ui: EventUi;
    interactive?: boolean;
    extendedProps: import("../options.js").Dictionary;
};
export interface EventContentArg {
    event: EventImpl;
    timeText: string;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    isDraggable: boolean;
    isStartResizable: boolean;
    isEndResizable: boolean;
    isMirror: boolean;
    isStart: boolean;
    isEnd: boolean;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
    isSelected: boolean;
    isDragging: boolean;
    isResizing: boolean;
    view: ViewApi;
}
export type EventMountArg = MountArg<EventContentArg>;
export declare function computeSegDraggable(seg: Seg, context: ViewContext): boolean;
export declare function computeSegStartResizable(seg: Seg, context: ViewContext): boolean;
export declare function computeSegEndResizable(seg: Seg, context: ViewContext): boolean;
export declare function buildSegTimeText(seg: Seg, timeFormat: DateFormatter, context: ViewContext, defaultDisplayEventTime?: boolean, // defaults to true
defaultDisplayEventEnd?: boolean, // defaults to true
startOverride?: DateMarker, endOverride?: DateMarker): string;
export declare function getSegMeta(seg: Seg, todayRange: DateRange, nowDate?: DateMarker): {
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
};
export declare function getEventClassNames(props: EventContentArg): string[];
export declare function buildEventRangeKey(eventRange: EventRenderRange): string;
export declare function getSegAnchorAttrs(seg: Seg, context: ViewContext): {
    tabIndex: number;
    onKeyDown(ev: KeyboardEvent): void;
} | {
    href: string;
} | {
    href?: undefined;
};
//# sourceMappingURL=event-rendering.d.ts.map