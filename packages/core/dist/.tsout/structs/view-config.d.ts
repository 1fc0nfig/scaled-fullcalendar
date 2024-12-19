import { ViewProps } from '../View.js';
import { ComponentType, Component } from '../preact.js';
import { MountArg } from '../common/render-hook.js';
import { ViewOptions } from '../options.js';
import { Duration } from '../datelib/duration.js';
export type ViewComponent = Component<ViewProps>;
export type ViewComponentType = ComponentType<ViewProps>;
export type ViewConfigInput = ViewComponentType | ViewOptions;
export type ViewConfigInputHash = {
    [viewType: string]: ViewConfigInput;
};
export interface ViewConfig {
    superType: string;
    component: ViewComponentType | null;
    rawOptions: ViewOptions;
}
export type ViewConfigHash = {
    [viewType: string]: ViewConfig;
};
export declare function parseViewConfigs(inputs: ViewConfigInputHash): ViewConfigHash;
export interface SpecificViewContentArg extends ViewProps {
    nextDayThreshold: Duration;
}
export type SpecificViewMountArg = MountArg<SpecificViewContentArg>;
//# sourceMappingURL=view-config.d.ts.map