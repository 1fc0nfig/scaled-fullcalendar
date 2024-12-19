export function reduceDynamicOptionOverrides(dynamicOptionOverrides, action) {
    switch (action.type) {
        case 'SET_OPTION':
            return Object.assign(Object.assign({}, dynamicOptionOverrides), { [action.optionName]: action.rawOptionValue });
        default:
            return dynamicOptionOverrides;
    }
}
//# sourceMappingURL=options.js.map