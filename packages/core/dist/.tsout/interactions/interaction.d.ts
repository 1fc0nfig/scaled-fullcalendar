import { DateComponent } from '../component/DateComponent.js';
import { Hit } from './hit.js';
export declare abstract class Interaction {
    component: DateComponent<any>;
    isHitComboAllowed: ((hit0: Hit, hit1: Hit) => boolean) | null;
    constructor(settings: InteractionSettings);
    destroy(): void;
}
export type InteractionClass = {
    new (settings: InteractionSettings): Interaction;
};
export interface InteractionSettingsInput {
    el: HTMLElement;
    useEventCenter?: boolean;
    isHitComboAllowed?: (hit0: Hit, hit1: Hit) => boolean;
}
export interface InteractionSettings {
    component: DateComponent<any>;
    el: HTMLElement;
    useEventCenter: boolean;
    isHitComboAllowed: ((hit0: Hit, hit1: Hit) => boolean) | null;
}
export type InteractionSettingsStore = {
    [componenUid: string]: InteractionSettings;
};
export declare function parseInteractionSettings(component: DateComponent<any>, input: InteractionSettingsInput): InteractionSettings;
export declare function interactionSettingsToStore(settings: InteractionSettings): {
    [x: string]: InteractionSettings;
};
export declare const interactionSettingsStore: InteractionSettingsStore;
//# sourceMappingURL=interaction.d.ts.map