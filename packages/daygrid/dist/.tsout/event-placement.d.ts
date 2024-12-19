import { DayTableCell } from '@fullcalendar/core/internal';
import { TableSeg } from './TableSeg.js';
export interface TableSegPlacement {
    seg: TableSeg;
    isVisible: boolean;
    isAbsolute: boolean;
    absoluteTop: number;
    marginTop: number;
}
export declare function generateSegKey(seg: TableSeg): string;
export declare function generateSegUid(seg: TableSeg): string;
export declare function computeFgSegPlacement(segs: TableSeg[], // assumed already sorted
dayMaxEvents: boolean | number, dayMaxEventRows: boolean | number, strictOrder: boolean, segHeights: {
    [segUid: string]: number;
}, maxContentHeight: number | null, cells: DayTableCell[]): {
    singleColPlacements: TableSegPlacement[][];
    multiColPlacements: TableSegPlacement[][];
    moreCnts: number[];
    moreMarginTops: number[];
};
//# sourceMappingURL=event-placement.d.ts.map