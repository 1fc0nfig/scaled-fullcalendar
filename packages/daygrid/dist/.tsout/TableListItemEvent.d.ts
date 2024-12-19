import { BaseComponent, Seg } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
export interface DotTableEventProps {
    seg: Seg;
    isDragging: boolean;
    isSelected: boolean;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
    defaultDisplayEventEnd: boolean;
    children?: never;
}
export declare class TableListItemEvent extends BaseComponent<DotTableEventProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TableListItemEvent.d.ts.map