import { createElement } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
import { Seg } from '../component/DateComponent.js';
export interface BgEventProps {
    seg: Seg;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
}
export declare class BgEvent extends BaseComponent<BgEventProps> {
    render(): createElement.JSX.Element;
}
export declare function renderFill(fillType: string): createElement.JSX.Element;
//# sourceMappingURL=bg-fill.d.ts.map