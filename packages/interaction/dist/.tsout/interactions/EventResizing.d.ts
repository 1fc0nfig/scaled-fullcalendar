import { ViewApi, EventApi, EventChangeArg, EventRenderRange, Duration } from '@fullcalendar/core';
import { Seg, Hit, EventMutation, PointerDragEvent, EventStore, Interaction, InteractionSettings } from '@fullcalendar/core/internal';
import { HitDragging } from './HitDragging.js';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging.js';
export type EventResizeStartArg = EventResizeStartStopArg;
export type EventResizeStopArg = EventResizeStartStopArg;
export interface EventResizeStartStopArg {
    el: HTMLElement;
    event: EventApi;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export interface EventResizeDoneArg extends EventChangeArg {
    el: HTMLElement;
    startDelta: Duration;
    endDelta: Duration;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare class EventResizing extends Interaction {
    dragging: FeaturefulElementDragging;
    hitDragging: HitDragging;
    draggingSegEl: HTMLElement | null;
    draggingSeg: Seg | null;
    eventRange: EventRenderRange | null;
    relevantEvents: EventStore | null;
    validMutation: EventMutation | null;
    mutatedRelevantEvents: EventStore | null;
    constructor(settings: InteractionSettings);
    destroy(): void;
    handlePointerDown: (ev: PointerDragEvent) => void;
    handleDragStart: (ev: PointerDragEvent) => void;
    handleHitUpdate: (hit: Hit | null, isFinal: boolean, ev: PointerDragEvent) => void;
    handleDragEnd: (ev: PointerDragEvent) => void;
    querySegEl(ev: PointerDragEvent): HTMLElement;
}
//# sourceMappingURL=EventResizing.d.ts.map