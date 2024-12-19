/* eslint max-classes-per-file: "off" */
/*
An object for getting/setting scroll-related information for an element.
Internally, this is done very differently for window versus DOM element,
so this object serves as a common interface.
*/
export class ScrollController {
    getMaxScrollTop() {
        return this.getScrollHeight() - this.getClientHeight();
    }
    getMaxScrollLeft() {
        return this.getScrollWidth() - this.getClientWidth();
    }
    canScrollVertically() {
        return this.getMaxScrollTop() > 0;
    }
    canScrollHorizontally() {
        return this.getMaxScrollLeft() > 0;
    }
    canScrollUp() {
        return this.getScrollTop() > 0;
    }
    canScrollDown() {
        return this.getScrollTop() < this.getMaxScrollTop();
    }
    canScrollLeft() {
        return this.getScrollLeft() > 0;
    }
    canScrollRight() {
        return this.getScrollLeft() < this.getMaxScrollLeft();
    }
}
export class ElementScrollController extends ScrollController {
    constructor(el) {
        super();
        this.el = el;
    }
    getScrollTop() {
        return this.el.scrollTop;
    }
    getScrollLeft() {
        return this.el.scrollLeft;
    }
    setScrollTop(top) {
        this.el.scrollTop = top;
    }
    setScrollLeft(left) {
        this.el.scrollLeft = left;
    }
    getScrollWidth() {
        return this.el.scrollWidth;
    }
    getScrollHeight() {
        return this.el.scrollHeight;
    }
    getClientHeight() {
        return this.el.clientHeight;
    }
    getClientWidth() {
        return this.el.clientWidth;
    }
}
export class WindowScrollController extends ScrollController {
    getScrollTop() {
        return window.scrollY;
    }
    getScrollLeft() {
        return window.scrollX;
    }
    setScrollTop(n) {
        window.scroll(window.scrollX, n);
    }
    setScrollLeft(n) {
        window.scroll(n, window.scrollY);
    }
    getScrollWidth() {
        return document.documentElement.scrollWidth;
    }
    getScrollHeight() {
        return document.documentElement.scrollHeight;
    }
    getClientHeight() {
        return document.documentElement.clientHeight;
    }
    getClientWidth() {
        return document.documentElement.clientWidth;
    }
}
//# sourceMappingURL=scroll-controller.js.map