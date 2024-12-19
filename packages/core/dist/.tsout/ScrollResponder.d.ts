import { Duration } from './datelib/duration.js';
import { Emitter } from './common/Emitter.js';
import { CalendarListeners } from './options.js';
export interface ScrollRequest {
    time?: Duration;
    [otherProp: string]: any;
}
export type ScrollRequestHandler = (request: ScrollRequest) => boolean;
export declare class ScrollResponder {
    private execFunc;
    private emitter;
    private scrollTime;
    private scrollTimeReset;
    queuedRequest: ScrollRequest;
    constructor(execFunc: ScrollRequestHandler, emitter: Emitter<CalendarListeners>, scrollTime: Duration, scrollTimeReset: boolean);
    detach(): void;
    update(isDatesNew: boolean): void;
    private fireInitialScroll;
    private handleScrollRequest;
    private drain;
}
//# sourceMappingURL=ScrollResponder.d.ts.map