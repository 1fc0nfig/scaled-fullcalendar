import { createElement, ComponentChildren, Ref } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
import { CssDimValue, ScrollerLike } from './util.js';
export type OverflowValue = 'auto' | 'hidden' | 'scroll' | 'visible';
export interface ScrollerProps {
    elRef?: Ref<HTMLElement>;
    overflowX: OverflowValue;
    overflowY: OverflowValue;
    overcomeLeft?: number;
    overcomeRight?: number;
    overcomeBottom?: number;
    maxHeight?: CssDimValue;
    liquid?: boolean;
    liquidIsAbsolute?: boolean;
    children?: ComponentChildren;
}
export declare class Scroller extends BaseComponent<ScrollerProps> implements ScrollerLike {
    el: HTMLElement;
    render(): createElement.JSX.Element;
    handleEl: (el: HTMLElement) => void;
    needsXScrolling(): boolean;
    needsYScrolling(): boolean;
    getXScrollbarWidth(): number;
    getYScrollbarWidth(): number;
}
//# sourceMappingURL=Scroller.d.ts.map