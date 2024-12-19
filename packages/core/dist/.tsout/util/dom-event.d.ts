export declare function preventDefault(ev: any): void;
export declare function buildDelegationHandler<EventType extends (Event | UIEvent)>(selector: string, handler: (ev: EventType, matchedTarget: HTMLElement) => void): (ev: EventType) => void;
export declare function listenBySelector(container: HTMLElement, eventType: string, selector: string, handler: (ev: Event, matchedTarget: HTMLElement) => void): () => void;
export declare function listenToHoverBySelector(container: HTMLElement, selector: string, onMouseEnter: (ev: Event, matchedTarget: HTMLElement) => void, onMouseLeave: (ev: Event, matchedTarget: HTMLElement) => void): () => void;
export declare function whenTransitionDone(el: HTMLElement, callback: (ev: Event) => void): void;
export declare function createAriaClickAttrs(handler: ((ev: UIEvent) => void)): {
    tabIndex: number;
    onKeyDown(ev: KeyboardEvent): void;
    onClick: (ev: UIEvent) => void;
};
export declare function createAriaKeyboardAttrs(handler: ((ev: UIEvent) => void)): {
    tabIndex: number;
    onKeyDown(ev: KeyboardEvent): void;
};
//# sourceMappingURL=dom-event.d.ts.map