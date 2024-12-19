import { EventSegUiInteractionState, Seg } from '@fullcalendar/core/internal';
export interface TableSeg extends Seg {
    row: number;
    firstCol: number;
    lastCol: number;
}
export declare function splitSegsByRow(segs: TableSeg[], rowCnt: number): TableSeg[][];
export declare function splitSegsByFirstCol(segs: TableSeg[], colCnt: number): TableSeg[][];
export declare function splitInteractionByRow(ui: EventSegUiInteractionState | null, rowCnt: number): EventSegUiInteractionState[];
//# sourceMappingURL=TableSeg.d.ts.map