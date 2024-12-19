import { BaseComponent } from '../vdom-util.js';
import { EventRenderRange } from './event-rendering.js';
import { EventInstanceHash } from '../structs/event-instance.js';
import { Hit } from '../interactions/hit.js';
import { Dictionary } from '../options.js';
export type DateComponentHash = {
    [uid: string]: DateComponent<any, any>;
};
export interface Seg {
    component?: DateComponent<any, any>;
    isStart: boolean;
    isEnd: boolean;
    eventRange?: EventRenderRange;
    [otherProp: string]: any;
    el?: never;
}
export interface EventSegUiInteractionState {
    affectedInstances: EventInstanceHash;
    segs: Seg[];
    isEvent: boolean;
}
export declare abstract class DateComponent<Props = Dictionary, State = Dictionary> extends BaseComponent<Props, State> {
    uid: string;
    prepareHits(): void;
    queryHit(positionLeft: number, positionTop: number, elWidth: number, elHeight: number): Hit | null;
    isValidSegDownEl(el: HTMLElement): boolean;
    isValidDateDownEl(el: HTMLElement): boolean;
}
//# sourceMappingURL=DateComponent.d.ts.map