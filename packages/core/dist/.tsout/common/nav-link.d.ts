import { DateMarker } from '../datelib/marker.js';
import { ViewContext } from '../ViewContext.js';
export declare function buildNavLinkAttrs(context: ViewContext, dateMarker: DateMarker, viewType?: string, isTabbable?: boolean): {
    tabIndex: number;
    onKeyDown(ev: KeyboardEvent): void;
    onClick: (ev: UIEvent) => void;
    title: any;
    'data-navlink': string;
    'aria-label'?: undefined;
} | {
    onClick: (ev: UIEvent) => void;
    title: any;
    'data-navlink': string;
    'aria-label'?: undefined;
} | {
    'aria-label': string;
};
//# sourceMappingURL=nav-link.d.ts.map