import { MinimalEventProps, BaseComponent } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
export interface ListViewEventRowProps extends MinimalEventProps {
    timeHeaderId: string;
    eventHeaderId: string;
    dateHeaderId: string;
}
export declare class ListViewEventRow extends BaseComponent<ListViewEventRowProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=ListViewEventRow.d.ts.map