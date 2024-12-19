import { Rect } from '@fullcalendar/core/internal';
import { ElementScrollGeomCache } from './ElementScrollGeomCache.js';
export declare class OffsetTracker {
    el: HTMLElement;
    scrollCaches: ElementScrollGeomCache[];
    origRect: Rect;
    constructor(el: HTMLElement);
    destroy(): void;
    computeLeft(): number;
    computeTop(): number;
    isWithinClipping(pageX: number, pageY: number): boolean;
}
//# sourceMappingURL=OffsetTracker.d.ts.map