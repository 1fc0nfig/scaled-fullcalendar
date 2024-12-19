import { BaseComponent, MinimalEventProps } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
export interface TimeColEventProps extends MinimalEventProps {
    isShort: boolean;
}
export declare class TimeColEvent extends BaseComponent<TimeColEventProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TimeColEvent.d.ts.map