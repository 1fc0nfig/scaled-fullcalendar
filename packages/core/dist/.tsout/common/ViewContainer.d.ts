import { ViewSpec } from '../structs/view-spec.js';
import { MountArg } from './render-hook.js';
import { ComponentChildren, createElement } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
import { ViewApi } from '../api/ViewApi.js';
import { ElProps } from '../content-inject/ContentInjector.js';
export interface ViewContainerProps extends Partial<ElProps> {
    viewSpec: ViewSpec;
    children: ComponentChildren;
}
export interface ViewContentArg {
    view: ViewApi;
}
export type ViewMountArg = MountArg<ViewContentArg>;
export declare class ViewContainer extends BaseComponent<ViewContainerProps> {
    render(): createElement.JSX.Element;
}
export declare function buildViewClassNames(viewSpec: ViewSpec): string[];
//# sourceMappingURL=ViewContainer.d.ts.map