import { ComponentChild, createElement } from '../preact.js';
import { DateMarker } from '../datelib/marker.js';
import { DateRange } from '../datelib/date-range.js';
import { DateMeta } from '../component/date-rendering.js';
import { DateFormatter } from '../datelib/DateFormatter.js';
import { MountArg } from './render-hook.js';
import { ViewApi } from '../api/ViewApi.js';
import { BaseComponent } from '../vdom-util.js';
import { DateProfile } from '../DateProfileGenerator.js';
import { Dictionary, ViewOptions } from '../options.js';
import { DateEnv } from '../datelib/env.js';
import { InnerContainerFunc } from '../content-inject/ContentContainer.js';
import { ElProps } from '../content-inject/ContentInjector.js';
export interface DayCellContentArg extends DateMeta {
    date: DateMarker;
    view: ViewApi;
    dayNumberText: string;
    [extraProp: string]: any;
}
export type DayCellMountArg = MountArg<DayCellContentArg>;
export interface DayCellContainerProps extends Partial<ElProps> {
    date: DateMarker;
    dateProfile: DateProfile;
    todayRange: DateRange;
    isMonthStart?: boolean;
    showDayNumber?: boolean;
    extraRenderProps?: Dictionary;
    defaultGenerator?: (renderProps: DayCellContentArg) => ComponentChild;
    children?: InnerContainerFunc<DayCellContentArg>;
}
export declare class DayCellContainer extends BaseComponent<DayCellContainerProps> {
    refineRenderProps: (arg: DayCellRenderPropsInput) => DayCellContentArg;
    render(): createElement.JSX.Element;
}
export declare function hasCustomDayCellContent(options: ViewOptions): boolean;
interface DayCellRenderPropsInput {
    date: DateMarker;
    dateProfile: DateProfile;
    todayRange: DateRange;
    dateEnv: DateEnv;
    viewApi: ViewApi;
    monthStartFormat: DateFormatter;
    isMonthStart: boolean;
    showDayNumber?: boolean;
    extraRenderProps?: Dictionary;
}
export {};
//# sourceMappingURL=DayCellContainer.d.ts.map