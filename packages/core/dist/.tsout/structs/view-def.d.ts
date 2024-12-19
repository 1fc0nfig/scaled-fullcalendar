import { ViewConfigHash, ViewComponentType } from './view-config.js';
import { ViewOptions } from '../options.js';
export interface ViewDef {
    type: string;
    component: ViewComponentType;
    overrides: ViewOptions;
    defaults: ViewOptions;
}
export type ViewDefHash = {
    [viewType: string]: ViewDef;
};
export declare function compileViewDefs(defaultConfigs: ViewConfigHash, overrideConfigs: ViewConfigHash): ViewDefHash;
//# sourceMappingURL=view-def.d.ts.map