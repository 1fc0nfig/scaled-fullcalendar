import { Emitter } from '../common/Emitter.js';
/*
An abstraction for a dragging interaction originating on an event.
Does higher-level things than PointerDragger, such as possibly:
- a "mirror" that moves with the pointer
- a minimum number of pixels or other criteria for a true drag to begin

subclasses must emit:
- pointerdown
- dragstart
- dragmove
- pointerup
- dragend
*/
export class ElementDragging {
    constructor(el, selector) {
        this.emitter = new Emitter();
    }
    destroy() {
    }
    setMirrorIsVisible(bool) {
        // optional if subclass doesn't want to support a mirror
    }
    setMirrorNeedsRevert(bool) {
        // optional if subclass doesn't want to support a mirror
    }
    setAutoScrollEnabled(bool) {
        // optional
    }
}
//# sourceMappingURL=ElementDragging.js.map