import { RawLocaleInfo } from '../datelib/locale.js';
import { Action } from './Action.js';
import { PluginHooks } from '../plugin-system-struct.js';
import { CalendarImpl } from '../api/CalendarImpl.js';
import { ViewSpec } from '../structs/view-spec.js';
import { Emitter } from '../common/Emitter.js';
import { CalendarOptionsRefined, CalendarOptions, ViewOptions, ViewOptionsRefined, Dictionary } from '../options.js';
import { CalendarContext } from '../CalendarContext.js';
import { CalendarDataManagerState, CalendarOptionsData, CalendarCurrentViewData, CalendarData } from './data-types.js';
export interface CalendarDataManagerProps {
    optionOverrides: CalendarOptions;
    calendarApi: CalendarImpl;
    onAction?: (action: Action) => void;
    onData?: (data: CalendarData) => void;
}
export type ReducerFunc = (// TODO: rename to CalendarDataInjector. move view-props-manip hook here as well?
currentState: Dictionary | null, action: Action | null, context: CalendarContext & CalendarDataManagerState) => Dictionary;
export declare class CalendarDataManager {
    private computeCurrentViewData;
    private organizeRawLocales;
    private buildLocale;
    private buildPluginHooks;
    private buildDateEnv;
    private buildTheme;
    private parseToolbars;
    private buildViewSpecs;
    private buildDateProfileGenerator;
    private buildViewApi;
    private buildViewUiProps;
    private buildEventUiBySource;
    private buildEventUiBases;
    private parseContextBusinessHours;
    private buildTitle;
    emitter: Emitter<Required<import("../options.js").RefinedOptionsFromRefiners<Required<import("../options.js").CalendarListenerRefiners>>>>;
    private actionRunner;
    private props;
    private state;
    private data;
    currentCalendarOptionsInput: CalendarOptions;
    private currentCalendarOptionsRefined;
    private currentViewOptionsInput;
    private currentViewOptionsRefined;
    currentCalendarOptionsRefiners: any;
    private stableOptionOverrides;
    private stableDynamicOptionOverrides;
    private stableCalendarOptionsData;
    private optionsForRefining;
    private optionsForHandling;
    constructor(props: CalendarDataManagerProps);
    getCurrentData: () => CalendarData;
    dispatch: (action: Action) => void;
    resetOptions(optionOverrides: CalendarOptions, changedOptionNames?: string[]): void;
    _handleAction(action: Action): void;
    updateData(): void;
    computeOptionsData(optionOverrides: CalendarOptions, dynamicOptionOverrides: CalendarOptions, calendarApi: CalendarImpl): CalendarOptionsData;
    processRawCalendarOptions(optionOverrides: CalendarOptions, dynamicOptionOverrides: CalendarOptions): {
        rawOptions: CalendarOptions;
        refinedOptions: CalendarOptionsRefined;
        pluginHooks: PluginHooks;
        availableLocaleData: RawLocaleInfo;
        localeDefaults: CalendarOptionsRefined;
        extra: {};
    };
    _computeCurrentViewData(viewType: string, optionsData: CalendarOptionsData, optionOverrides: CalendarOptions, dynamicOptionOverrides: CalendarOptions): CalendarCurrentViewData;
    processRawViewOptions(viewSpec: ViewSpec, pluginHooks: PluginHooks, localeDefaults: CalendarOptions, optionOverrides: CalendarOptions, dynamicOptionOverrides: CalendarOptions): {
        rawOptions: ViewOptions;
        refinedOptions: ViewOptionsRefined;
        extra: {};
    };
}
//# sourceMappingURL=CalendarDataManager.d.ts.map