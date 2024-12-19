import { computeInnerRect, ElementScrollController } from '@fullcalendar/core/internal';
import { ScrollGeomCache } from './ScrollGeomCache.js';
export class ElementScrollGeomCache extends ScrollGeomCache {
    constructor(el, doesListening) {
        super(new ElementScrollController(el), doesListening);
    }
    getEventTarget() {
        return this.scrollController.el;
    }
    computeClientRect() {
        return computeInnerRect(this.scrollController.el);
    }
}
//# sourceMappingURL=ElementScrollGeomCache.js.map