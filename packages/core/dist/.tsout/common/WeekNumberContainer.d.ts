import { DateMarker } from '../datelib/marker.js';
import { MountArg } from './render-hook.js';
import { createElement } from '../preact.js';
import { DateFormatter } from '../datelib/DateFormatter.js';
import { ElProps } from '../content-inject/ContentInjector.js';
import { InnerContainerFunc } from '../content-inject/ContentContainer.js';
export interface WeekNumberContainerProps extends ElProps {
    date: DateMarker;
    defaultFormat: DateFormatter;
    children?: InnerContainerFunc<WeekNumberContentArg>;
}
export interface WeekNumberContentArg {
    num: number;
    text: string;
    date: Date;
}
export type WeekNumberMountArg = MountArg<WeekNumberContentArg>;
export declare const WeekNumberContainer: (props: WeekNumberContainerProps) => createElement.JSX.Element;
//# sourceMappingURL=WeekNumberContainer.d.ts.map