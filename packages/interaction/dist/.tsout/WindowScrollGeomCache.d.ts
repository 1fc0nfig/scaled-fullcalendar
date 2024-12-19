import { Rect } from '@fullcalendar/core/internal';
import { ScrollGeomCache } from './ScrollGeomCache.js';
export declare class WindowScrollGeomCache extends ScrollGeomCache {
    constructor(doesListening: boolean);
    getEventTarget(): EventTarget;
    computeClientRect(): Rect;
    handleScrollChange(): void;
}
//# sourceMappingURL=WindowScrollGeomCache.d.ts.map