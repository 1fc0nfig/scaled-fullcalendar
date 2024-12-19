import { CssDimValue } from '@fullcalendar/core';
import { BaseComponent, DateProfile } from '@fullcalendar/core/internal';
import { createElement, VNode } from '@fullcalendar/core/preact';
import { TimeSlatMeta } from './time-slat-meta.js';
import { TimeColsSlatsCoords } from './TimeColsSlatsCoords.js';
export interface TimeColsSlatsProps extends TimeColsSlatsContentProps {
    dateProfile: DateProfile;
    clientWidth: number | null;
    minHeight: CssDimValue;
    tableMinWidth: CssDimValue;
    tableColGroupNode: VNode;
    onCoords?: (coords: TimeColsSlatsCoords | null) => void;
}
interface TimeColsSlatsContentProps {
    axis: boolean;
    slatMetas: TimeSlatMeta[];
}
export declare class TimeColsSlats extends BaseComponent<TimeColsSlatsProps> {
    private rootElRef;
    private slatElRefs;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    updateSizing(): void;
}
export {};
//# sourceMappingURL=TimeColsSlats.d.ts.map