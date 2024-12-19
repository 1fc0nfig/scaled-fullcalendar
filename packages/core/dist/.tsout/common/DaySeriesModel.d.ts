import { DateProfileGenerator } from '../DateProfileGenerator.js';
import { DateMarker } from '../datelib/marker.js';
import { DateRange } from '../datelib/date-range.js';
export interface DaySeriesSeg {
    firstIndex: number;
    lastIndex: number;
    isStart: boolean;
    isEnd: boolean;
}
export declare class DaySeriesModel {
    cnt: number;
    dates: DateMarker[];
    indices: number[];
    constructor(range: DateRange, dateProfileGenerator: DateProfileGenerator);
    sliceRange(range: DateRange): DaySeriesSeg | null;
    private getDateDayIndex;
}
//# sourceMappingURL=DaySeriesModel.d.ts.map