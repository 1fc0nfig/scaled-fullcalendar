export class Interaction {
    constructor(settings) {
        this.component = settings.component;
        this.isHitComboAllowed = settings.isHitComboAllowed || null;
    }
    destroy() {
    }
}
export function parseInteractionSettings(component, input) {
    return {
        component,
        el: input.el,
        useEventCenter: input.useEventCenter != null ? input.useEventCenter : true,
        isHitComboAllowed: input.isHitComboAllowed || null,
    };
}
export function interactionSettingsToStore(settings) {
    return {
        [settings.component.uid]: settings,
    };
}
// global state
export const interactionSettingsStore = {};
//# sourceMappingURL=interaction.js.map