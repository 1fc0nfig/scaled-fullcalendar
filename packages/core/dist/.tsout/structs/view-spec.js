import { compileViewDefs } from './view-def.js';
import { createDuration, greatestDurationDenominator } from '../datelib/duration.js';
import { mapHash } from '../util/object.js';
import { BASE_OPTION_DEFAULTS } from '../options.js';
import { parseViewConfigs } from './view-config.js';
export function buildViewSpecs(defaultInputs, optionOverrides, dynamicOptionOverrides, localeDefaults) {
    let defaultConfigs = parseViewConfigs(defaultInputs);
    let overrideConfigs = parseViewConfigs(optionOverrides.views);
    let viewDefs = compileViewDefs(defaultConfigs, overrideConfigs);
    return mapHash(viewDefs, (viewDef) => buildViewSpec(viewDef, overrideConfigs, optionOverrides, dynamicOptionOverrides, localeDefaults));
}
function buildViewSpec(viewDef, overrideConfigs, optionOverrides, dynamicOptionOverrides, localeDefaults) {
    let durationInput = viewDef.overrides.duration ||
        viewDef.defaults.duration ||
        dynamicOptionOverrides.duration ||
        optionOverrides.duration;
    let duration = null;
    let durationUnit = '';
    let singleUnit = '';
    let singleUnitOverrides = {};
    if (durationInput) {
        duration = createDurationCached(durationInput);
        if (duration) { // valid?
            let denom = greatestDurationDenominator(duration);
            durationUnit = denom.unit;
            if (denom.value === 1) {
                singleUnit = durationUnit;
                singleUnitOverrides = overrideConfigs[durationUnit] ? overrideConfigs[durationUnit].rawOptions : {};
            }
        }
    }
    let queryButtonText = (optionsSubset) => {
        let buttonTextMap = optionsSubset.buttonText || {};
        let buttonTextKey = viewDef.defaults.buttonTextKey;
        if (buttonTextKey != null && buttonTextMap[buttonTextKey] != null) {
            return buttonTextMap[buttonTextKey];
        }
        if (buttonTextMap[viewDef.type] != null) {
            return buttonTextMap[viewDef.type];
        }
        if (buttonTextMap[singleUnit] != null) {
            return buttonTextMap[singleUnit];
        }
        return null;
    };
    let queryButtonTitle = (optionsSubset) => {
        let buttonHints = optionsSubset.buttonHints || {};
        let buttonKey = viewDef.defaults.buttonTextKey; // use same key as text
        if (buttonKey != null && buttonHints[buttonKey] != null) {
            return buttonHints[buttonKey];
        }
        if (buttonHints[viewDef.type] != null) {
            return buttonHints[viewDef.type];
        }
        if (buttonHints[singleUnit] != null) {
            return buttonHints[singleUnit];
        }
        return null;
    };
    return {
        type: viewDef.type,
        component: viewDef.component,
        duration,
        durationUnit,
        singleUnit,
        optionDefaults: viewDef.defaults,
        optionOverrides: Object.assign(Object.assign({}, singleUnitOverrides), viewDef.overrides),
        buttonTextOverride: queryButtonText(dynamicOptionOverrides) ||
            queryButtonText(optionOverrides) || // constructor-specified buttonText lookup hash takes precedence
            viewDef.overrides.buttonText,
        buttonTextDefault: queryButtonText(localeDefaults) ||
            viewDef.defaults.buttonText ||
            queryButtonText(BASE_OPTION_DEFAULTS) ||
            viewDef.type,
        // not DRY
        buttonTitleOverride: queryButtonTitle(dynamicOptionOverrides) ||
            queryButtonTitle(optionOverrides) ||
            viewDef.overrides.buttonHint,
        buttonTitleDefault: queryButtonTitle(localeDefaults) ||
            viewDef.defaults.buttonHint ||
            queryButtonTitle(BASE_OPTION_DEFAULTS),
        // will eventually fall back to buttonText
    };
}
// hack to get memoization working
let durationInputMap = {};
function createDurationCached(durationInput) {
    let json = JSON.stringify(durationInput);
    let res = durationInputMap[json];
    if (res === undefined) {
        res = createDuration(durationInput);
        durationInputMap[json] = res;
    }
    return res;
}
//# sourceMappingURL=view-spec.js.map