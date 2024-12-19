import { Duration } from '../datelib/duration.js';
import { ViewOptions, CalendarOptions } from '../options.js';
import { ViewConfigInputHash, ViewComponentType } from './view-config.js';
export interface ViewSpec {
    type: string;
    component: ViewComponentType;
    duration: Duration;
    durationUnit: string;
    singleUnit: string;
    optionDefaults: ViewOptions;
    optionOverrides: ViewOptions;
    buttonTextOverride: string;
    buttonTextDefault: string;
    buttonTitleOverride: string | ((...args: any[]) => string);
    buttonTitleDefault: string | ((...args: any[]) => string);
}
export type ViewSpecHash = {
    [viewType: string]: ViewSpec;
};
export declare function buildViewSpecs(defaultInputs: ViewConfigInputHash, optionOverrides: CalendarOptions, dynamicOptionOverrides: CalendarOptions, localeDefaults: any): ViewSpecHash;
//# sourceMappingURL=view-spec.d.ts.map