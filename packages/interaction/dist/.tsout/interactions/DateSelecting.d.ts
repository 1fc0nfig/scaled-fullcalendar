import { Hit, DateSpan, PointerDragEvent, Interaction, InteractionSettings } from '@fullcalendar/core/internal';
import { HitDragging } from './HitDragging.js';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging.js';
export declare class DateSelecting extends Interaction {
    dragging: FeaturefulElementDragging;
    hitDragging: HitDragging;
    dragSelection: DateSpan | null;
    constructor(settings: InteractionSettings);
    destroy(): void;
    handlePointerDown: (ev: PointerDragEvent) => void;
    handleDragStart: (ev: PointerDragEvent) => void;
    handleHitUpdate: (hit: Hit | null, isFinal: boolean) => void;
    handlePointerUp: (pev: PointerDragEvent) => void;
}
//# sourceMappingURL=DateSelecting.d.ts.map