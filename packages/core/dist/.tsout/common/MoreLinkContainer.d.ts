import { Seg } from '../component/DateComponent.js';
import { DateRange } from '../datelib/date-range.js';
import { DateMarker } from '../datelib/marker.js';
import { DateProfile } from '../DateProfileGenerator.js';
import { Dictionary } from '../options.js';
import { createElement, ComponentChild, RefObject } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
import { ViewApi } from '../api/ViewApi.js';
import { MountArg } from './render-hook.js';
import { InnerContainerFunc } from '../content-inject/ContentContainer.js';
import { ElProps } from '../content-inject/ContentInjector.js';
export interface MoreLinkContainerProps extends Partial<ElProps> {
    dateProfile: DateProfile;
    todayRange: DateRange;
    allDayDate: DateMarker | null;
    moreCnt: number;
    allSegs: Seg[];
    hiddenSegs: Seg[];
    extraDateSpan?: Dictionary;
    alignmentElRef?: RefObject<HTMLElement>;
    alignGridTop?: boolean;
    forceTimed?: boolean;
    popoverContent: () => ComponentChild;
    defaultGenerator?: (renderProps: MoreLinkContentArg) => ComponentChild;
    children?: InnerContainerFunc<MoreLinkContentArg>;
}
export interface MoreLinkContentArg {
    num: number;
    text: string;
    shortText: string;
    view: ViewApi;
}
export type MoreLinkMountArg = MountArg<MoreLinkContentArg>;
interface MoreLinkContainerState {
    isPopoverOpen: boolean;
    popoverId: string;
}
export declare class MoreLinkContainer extends BaseComponent<MoreLinkContainerProps, MoreLinkContainerState> {
    private linkEl;
    private parentEl;
    state: {
        isPopoverOpen: boolean;
        popoverId: string;
    };
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    handleLinkEl: (linkEl: HTMLElement | null) => void;
    updateParentEl(): void;
    handleClick: (ev: MouseEvent) => void;
    handlePopoverClose: () => void;
}
export declare function computeEarliestSegStart(segs: Seg[]): DateMarker;
export {};
//# sourceMappingURL=MoreLinkContainer.d.ts.map