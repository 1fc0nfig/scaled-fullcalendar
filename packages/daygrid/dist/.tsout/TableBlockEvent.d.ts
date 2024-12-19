import { BaseComponent, MinimalEventProps } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
export interface TableBlockEventProps extends MinimalEventProps {
    defaultDisplayEventEnd: boolean;
}
export declare class TableBlockEvent extends BaseComponent<TableBlockEventProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TableBlockEvent.d.ts.map