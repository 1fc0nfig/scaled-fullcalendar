import { ComponentChild, createElement } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
import { Seg } from '../component/DateComponent.js';
import { EventContentArg } from '../component/event-rendering.js';
import { InnerContainerFunc } from '../content-inject/ContentContainer.js';
import { ElProps } from '../content-inject/ContentInjector.js';
export interface MinimalEventProps {
    seg: Seg;
    isDragging: boolean;
    isResizing: boolean;
    isDateSelecting: boolean;
    isSelected: boolean;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
}
export type EventContainerProps = ElProps & MinimalEventProps & {
    defaultGenerator: (renderProps: EventContentArg) => ComponentChild;
    disableDragging?: boolean;
    disableResizing?: boolean;
    timeText: string;
    children?: InnerContainerFunc<EventContentArg>;
};
export declare class EventContainer extends BaseComponent<EventContainerProps> {
    el: HTMLElement;
    render(): createElement.JSX.Element;
    handleEl: (el: HTMLElement | null) => void;
    componentDidUpdate(prevProps: EventContainerProps): void;
}
//# sourceMappingURL=EventContainer.d.ts.map