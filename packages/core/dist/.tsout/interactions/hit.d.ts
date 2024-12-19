import { DateProfile } from '../DateProfileGenerator.js';
import { DateSpan } from '../structs/date-span.js';
import { Rect } from '../util/geom.js';
import { ViewContext } from '../ViewContext.js';
export interface Hit {
    componentId?: string;
    context?: ViewContext;
    dateProfile: DateProfile;
    dateSpan: DateSpan;
    dayEl: HTMLElement;
    rect: Rect;
    layer: number;
    largeUnit?: string;
}
//# sourceMappingURL=hit.d.ts.map