import { CssDimValue } from '@fullcalendar/core';
import { BaseComponent, Dictionary, DateProfile, DateRange, DateMarker, EventSegUiInteractionState } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
import { TimeColsSeg } from './TimeColsSeg.js';
export interface TimeColMoreLinkProps {
    hiddenSegs: TimeColsSeg[];
    top: CssDimValue;
    bottom: CssDimValue;
    extraDateSpan?: Dictionary;
    dateProfile: DateProfile;
    todayRange: DateRange;
    nowDate: DateMarker;
    eventSelection: string;
    eventDrag: EventSegUiInteractionState;
    eventResize: EventSegUiInteractionState;
}
export declare class TimeColMoreLink extends BaseComponent<TimeColMoreLinkProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TimeColMoreLink.d.ts.map