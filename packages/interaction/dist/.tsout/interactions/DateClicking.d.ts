import { ViewApi, DatePointApi } from '@fullcalendar/core';
import { PointerDragEvent, Interaction, InteractionSettings } from '@fullcalendar/core/internal';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging.js';
import { HitDragging } from './HitDragging.js';
export interface DateClickArg extends DatePointApi {
    dayEl: HTMLElement;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare class DateClicking extends Interaction {
    dragging: FeaturefulElementDragging;
    hitDragging: HitDragging;
    constructor(settings: InteractionSettings);
    destroy(): void;
    handlePointerDown: (pev: PointerDragEvent) => void;
    handleDragEnd: (ev: PointerDragEvent) => void;
}
//# sourceMappingURL=DateClicking.d.ts.map