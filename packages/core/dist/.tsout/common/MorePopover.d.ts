import { DateComponent } from '../component/DateComponent.js';
import { DateRange } from '../datelib/date-range.js';
import { DateMarker } from '../datelib/marker.js';
import { DateProfile } from '../DateProfileGenerator.js';
import { Hit } from '../interactions/hit.js';
import { Dictionary } from '../options.js';
import { createElement, ComponentChildren } from '../preact.js';
export interface MorePopoverProps {
    id: string;
    startDate: DateMarker;
    endDate: DateMarker;
    dateProfile: DateProfile;
    parentEl: HTMLElement;
    alignmentEl: HTMLElement;
    alignGridTop?: boolean;
    forceTimed?: boolean;
    todayRange: DateRange;
    extraDateSpan: Dictionary;
    children: ComponentChildren;
    onClose?: () => void;
}
export declare class MorePopover extends DateComponent<MorePopoverProps> {
    rootEl: HTMLElement;
    render(): createElement.JSX.Element;
    handleRootEl: (rootEl: HTMLElement | null) => void;
    queryHit(positionLeft: number, positionTop: number, elWidth: number, elHeight: number): Hit;
}
//# sourceMappingURL=MorePopover.d.ts.map