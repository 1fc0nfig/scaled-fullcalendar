import { EventApi, ViewApi, EventRenderRange } from '@fullcalendar/core';
import { Seg, PointerDragEvent, Hit, EventMutation, EventStore, EventInteractionState, Interaction, InteractionSettings, CalendarContext } from '@fullcalendar/core/internal';
import { HitDragging } from './HitDragging.js';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging.js';
export type EventDragStopArg = EventDragArg;
export type EventDragStartArg = EventDragArg;
export interface EventDragArg {
    el: HTMLElement;
    event: EventApi;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare class EventDragging extends Interaction {
    static SELECTOR: string;
    dragging: FeaturefulElementDragging;
    hitDragging: HitDragging;
    subjectEl: HTMLElement | null;
    subjectSeg: Seg | null;
    isDragging: boolean;
    eventRange: EventRenderRange | null;
    relevantEvents: EventStore | null;
    receivingContext: CalendarContext | null;
    validMutation: EventMutation | null;
    mutatedRelevantEvents: EventStore | null;
    constructor(settings: InteractionSettings);
    destroy(): void;
    handlePointerDown: (ev: PointerDragEvent) => void;
    handleDragStart: (ev: PointerDragEvent) => void;
    handleHitUpdate: (hit: Hit | null, isFinal: boolean) => void;
    handlePointerUp: () => void;
    handleDragEnd: (ev: PointerDragEvent) => void;
    displayDrag(nextContext: CalendarContext | null, state: EventInteractionState): void;
    clearDrag(): void;
    cleanup(): void;
}
//# sourceMappingURL=EventDragging.d.ts.map