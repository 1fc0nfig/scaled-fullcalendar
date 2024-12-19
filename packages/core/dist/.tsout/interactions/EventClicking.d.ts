import { EventImpl } from '../api/EventImpl.js';
import { Interaction, InteractionSettings } from './interaction.js';
import { ViewApi } from '../api/ViewApi.js';
export interface EventClickArg {
    el: HTMLElement;
    event: EventImpl;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare class EventClicking extends Interaction {
    constructor(settings: InteractionSettings);
    handleSegClick: (ev: Event, segEl: HTMLElement) => void;
}
//# sourceMappingURL=EventClicking.d.ts.map