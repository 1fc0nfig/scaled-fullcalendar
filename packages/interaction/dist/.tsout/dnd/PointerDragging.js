import { config, elementClosest, Emitter } from '@fullcalendar/core/internal';
config.touchMouseIgnoreWait = 500;
let ignoreMouseDepth = 0;
let listenerCnt = 0;
let isWindowTouchMoveCancelled = false;
/*
Uses a "pointer" abstraction, which monitors UI events for both mouse and touch.
Tracks when the pointer "drags" on a certain element, meaning down+move+up.

Also, tracks if there was touch-scrolling.
Also, can prevent touch-scrolling from happening.
Also, can fire pointermove events when scrolling happens underneath, even when no real pointer movement.

emits:
- pointerdown
- pointermove
- pointerup
*/
export class PointerDragging {
    constructor(containerEl) {
        this.subjectEl = null;
        // options that can be directly assigned by caller
        this.selector = ''; // will cause subjectEl in all emitted events to be this element
        this.handleSelector = '';
        this.shouldIgnoreMove = false;
        this.shouldWatchScroll = true; // for simulating pointermove on scroll
        // internal states
        this.isDragging = false;
        this.isTouchDragging = false;
        this.wasTouchScroll = false;
        // Mouse
        // ----------------------------------------------------------------------------------------------------
        this.handleMouseDown = (ev) => {
            if (!this.shouldIgnoreMouse() &&
                isPrimaryMouseButton(ev) &&
                this.tryStart(ev)) {
                let pev = this.createEventFromMouse(ev, true);
                this.emitter.trigger('pointerdown', pev);
                this.initScrollWatch(pev);
                if (!this.shouldIgnoreMove) {
                    document.addEventListener('mousemove', this.handleMouseMove);
                }
                document.addEventListener('mouseup', this.handleMouseUp);
            }
        };
        this.handleMouseMove = (ev) => {
            let pev = this.createEventFromMouse(ev);
            this.recordCoords(pev);
            this.emitter.trigger('pointermove', pev);
        };
        this.handleMouseUp = (ev) => {
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
            this.emitter.trigger('pointerup', this.createEventFromMouse(ev));
            this.cleanup(); // call last so that pointerup has access to props
        };
        // Touch
        // ----------------------------------------------------------------------------------------------------
        this.handleTouchStart = (ev) => {
            if (this.tryStart(ev)) {
                this.isTouchDragging = true;
                let pev = this.createEventFromTouch(ev, true);
                this.emitter.trigger('pointerdown', pev);
                this.initScrollWatch(pev);
                // unlike mouse, need to attach to target, not document
                // https://stackoverflow.com/a/45760014
                let targetEl = ev.target;
                if (!this.shouldIgnoreMove) {
                    targetEl.addEventListener('touchmove', this.handleTouchMove);
                }
                targetEl.addEventListener('touchend', this.handleTouchEnd);
                targetEl.addEventListener('touchcancel', this.handleTouchEnd); // treat it as a touch end
                // attach a handler to get called when ANY scroll action happens on the page.
                // this was impossible to do with normal on/off because 'scroll' doesn't bubble.
                // http://stackoverflow.com/a/32954565/96342
                window.addEventListener('scroll', this.handleTouchScroll, true);
            }
        };
        this.handleTouchMove = (ev) => {
            let pev = this.createEventFromTouch(ev);
            this.recordCoords(pev);
            this.emitter.trigger('pointermove', pev);
        };
        this.handleTouchEnd = (ev) => {
            if (this.isDragging) { // done to guard against touchend followed by touchcancel
                let targetEl = ev.target;
                targetEl.removeEventListener('touchmove', this.handleTouchMove);
                targetEl.removeEventListener('touchend', this.handleTouchEnd);
                targetEl.removeEventListener('touchcancel', this.handleTouchEnd);
                window.removeEventListener('scroll', this.handleTouchScroll, true); // useCaptured=true
                this.emitter.trigger('pointerup', this.createEventFromTouch(ev));
                this.cleanup(); // call last so that pointerup has access to props
                this.isTouchDragging = false;
                startIgnoringMouse();
            }
        };
        this.handleTouchScroll = () => {
            this.wasTouchScroll = true;
        };
        this.handleScroll = (ev) => {
            if (!this.shouldIgnoreMove) {
                let pageX = (window.scrollX - this.prevScrollX) + this.prevPageX;
                let pageY = (window.scrollY - this.prevScrollY) + this.prevPageY;
                this.emitter.trigger('pointermove', {
                    origEvent: ev,
                    isTouch: this.isTouchDragging,
                    subjectEl: this.subjectEl,
                    pageX,
                    pageY,
                    deltaX: pageX - this.origPageX,
                    deltaY: pageY - this.origPageY,
                });
            }
        };
        this.containerEl = containerEl;
        this.emitter = new Emitter();
        containerEl.addEventListener('mousedown', this.handleMouseDown);
        containerEl.addEventListener('touchstart', this.handleTouchStart, { passive: true });
        listenerCreated();
    }
    destroy() {
        this.containerEl.removeEventListener('mousedown', this.handleMouseDown);
        this.containerEl.removeEventListener('touchstart', this.handleTouchStart, { passive: true });
        listenerDestroyed();
    }
    tryStart(ev) {
        let subjectEl = this.querySubjectEl(ev);
        let downEl = ev.target;
        if (subjectEl &&
            (!this.handleSelector || elementClosest(downEl, this.handleSelector))) {
            this.subjectEl = subjectEl;
            this.isDragging = true; // do this first so cancelTouchScroll will work
            this.wasTouchScroll = false;
            return true;
        }
        return false;
    }
    cleanup() {
        isWindowTouchMoveCancelled = false;
        this.isDragging = false;
        this.subjectEl = null;
        // keep wasTouchScroll around for later access
        this.destroyScrollWatch();
    }
    querySubjectEl(ev) {
        if (this.selector) {
            return elementClosest(ev.target, this.selector);
        }
        return this.containerEl;
    }
    shouldIgnoreMouse() {
        return ignoreMouseDepth || this.isTouchDragging;
    }
    // can be called by user of this class, to cancel touch-based scrolling for the current drag
    cancelTouchScroll() {
        if (this.isDragging) {
            isWindowTouchMoveCancelled = true;
        }
    }
    // Scrolling that simulates pointermoves
    // ----------------------------------------------------------------------------------------------------
    initScrollWatch(ev) {
        if (this.shouldWatchScroll) {
            this.recordCoords(ev);
            window.addEventListener('scroll', this.handleScroll, true); // useCapture=true
        }
    }
    recordCoords(ev) {
        if (this.shouldWatchScroll) {
            this.prevPageX = ev.pageX;
            this.prevPageY = ev.pageY;
            this.prevScrollX = window.scrollX;
            this.prevScrollY = window.scrollY;
        }
    }
    destroyScrollWatch() {
        if (this.shouldWatchScroll) {
            window.removeEventListener('scroll', this.handleScroll, true); // useCaptured=true
        }
    }
    // Event Normalization
    // ----------------------------------------------------------------------------------------------------
    createEventFromMouse(ev, isFirst) {
        let deltaX = 0;
        let deltaY = 0;
        // TODO: repeat code
        if (isFirst) {
            this.origPageX = ev.pageX;
            this.origPageY = ev.pageY;
        }
        else {
            deltaX = ev.pageX - this.origPageX;
            deltaY = ev.pageY - this.origPageY;
        }
        return {
            origEvent: ev,
            isTouch: false,
            subjectEl: this.subjectEl,
            pageX: ev.pageX,
            pageY: ev.pageY,
            deltaX,
            deltaY,
        };
    }
    createEventFromTouch(ev, isFirst) {
        let touches = ev.touches;
        let pageX;
        let pageY;
        let deltaX = 0;
        let deltaY = 0;
        // if touch coords available, prefer,
        // because FF would give bad ev.pageX ev.pageY
        if (touches && touches.length) {
            pageX = touches[0].pageX;
            pageY = touches[0].pageY;
        }
        else {
            pageX = ev.pageX;
            pageY = ev.pageY;
        }
        // TODO: repeat code
        if (isFirst) {
            this.origPageX = pageX;
            this.origPageY = pageY;
        }
        else {
            deltaX = pageX - this.origPageX;
            deltaY = pageY - this.origPageY;
        }
        return {
            origEvent: ev,
            isTouch: true,
            subjectEl: this.subjectEl,
            pageX,
            pageY,
            deltaX,
            deltaY,
        };
    }
}
// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
    return ev.button === 0 && !ev.ctrlKey;
}
// Ignoring fake mouse events generated by touch
// ----------------------------------------------------------------------------------------------------
function startIgnoringMouse() {
    ignoreMouseDepth += 1;
    setTimeout(() => {
        ignoreMouseDepth -= 1;
    }, config.touchMouseIgnoreWait);
}
// We want to attach touchmove as early as possible for Safari
// ----------------------------------------------------------------------------------------------------
function listenerCreated() {
    listenerCnt += 1;
    if (listenerCnt === 1) {
        window.addEventListener('touchmove', onWindowTouchMove, { passive: false });
    }
}
function listenerDestroyed() {
    listenerCnt -= 1;
    if (!listenerCnt) {
        window.removeEventListener('touchmove', onWindowTouchMove, { passive: false });
    }
}
function onWindowTouchMove(ev) {
    if (isWindowTouchMoveCancelled) {
        ev.preventDefault();
    }
}
//# sourceMappingURL=PointerDragging.js.map