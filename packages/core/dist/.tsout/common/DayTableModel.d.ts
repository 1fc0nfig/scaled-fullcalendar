import { DaySeriesModel } from './DaySeriesModel.js';
import { DateRange } from '../datelib/date-range.js';
import { DateMarker } from '../datelib/marker.js';
import { Seg } from '../component/DateComponent.js';
import { Dictionary } from '../options.js';
export interface DayTableSeg extends Seg {
    row: number;
    firstCol: number;
    lastCol: number;
}
export interface DayTableCell {
    key: string;
    date: DateMarker;
    extraRenderProps?: Dictionary;
    extraDataAttrs?: Dictionary;
    extraClassNames?: string[];
    extraDateSpan?: Dictionary;
}
export declare class DayTableModel {
    rowCnt: number;
    colCnt: number;
    cells: DayTableCell[][];
    headerDates: DateMarker[];
    private daySeries;
    constructor(daySeries: DaySeriesModel, breakOnWeeks: boolean);
    private buildCells;
    private buildCell;
    private buildHeaderDates;
    sliceRange(range: DateRange): DayTableSeg[];
}
//# sourceMappingURL=DayTableModel.d.ts.map