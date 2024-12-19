import { BaseComponent } from '../vdom-util.js';
import { DateMarker } from '../datelib/marker.js';
import { VNode, createElement } from '../preact.js';
import { DateProfile } from '../DateProfileGenerator.js';
import { DateFormatter } from '../datelib/DateFormatter.js';
export interface DayHeaderProps {
    dateProfile: DateProfile;
    dates: DateMarker[];
    datesRepDistinctDays: boolean;
    renderIntro?: (rowKey: string) => VNode;
}
export declare class DayHeader extends BaseComponent<DayHeaderProps> {
    createDayHeaderFormatter: (explicitFormat: DateFormatter, datesRepDistinctDays: any, dateCnt: any) => DateFormatter;
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=DayHeader.d.ts.map