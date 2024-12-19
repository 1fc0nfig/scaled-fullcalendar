import { MountArg } from './render-hook.js';
import { DateMarker } from '../datelib/marker.js';
import { createElement } from '../preact.js';
import { ViewApi } from '../api/ViewApi.js';
import { ElProps } from '../content-inject/ContentInjector.js';
import { InnerContainerFunc } from '../content-inject/ContentContainer.js';
export interface NowIndicatorContainerProps extends Partial<ElProps> {
    isAxis: boolean;
    date: DateMarker;
    children?: InnerContainerFunc<NowIndicatorContentArg>;
}
export interface NowIndicatorContentArg {
    isAxis: boolean;
    date: Date;
    view: ViewApi;
}
export type NowIndicatorMountArg = MountArg<NowIndicatorContentArg>;
export declare const NowIndicatorContainer: (props: NowIndicatorContainerProps) => createElement.JSX.Element;
//# sourceMappingURL=NowIndicatorContainer.d.ts.map