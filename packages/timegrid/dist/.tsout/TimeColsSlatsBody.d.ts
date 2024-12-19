import { BaseComponent, RefMap } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
import { TimeSlatMeta } from './time-slat-meta.js';
export interface TimeColsSlatsBodyProps {
    axis: boolean;
    slatMetas: TimeSlatMeta[];
    slatElRefs: RefMap<HTMLTableRowElement>;
}
export declare class TimeColsSlatsBody extends BaseComponent<TimeColsSlatsBodyProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TimeColsSlatsBody.d.ts.map