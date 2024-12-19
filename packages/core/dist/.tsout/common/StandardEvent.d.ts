import { createElement } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
import { DateFormatter } from '../datelib/DateFormatter.js';
import { Seg } from '../component/DateComponent.js';
import { ElRef } from '../content-inject/ContentInjector.js';
export interface StandardEventProps {
    elRef?: ElRef;
    elClasses?: string[];
    seg: Seg;
    isDragging: boolean;
    isResizing: boolean;
    isDateSelecting: boolean;
    isSelected: boolean;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
    disableDragging?: boolean;
    disableResizing?: boolean;
    defaultTimeFormat: DateFormatter;
    defaultDisplayEventTime?: boolean;
    defaultDisplayEventEnd?: boolean;
}
export declare class StandardEvent extends BaseComponent<StandardEventProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=StandardEvent.d.ts.map