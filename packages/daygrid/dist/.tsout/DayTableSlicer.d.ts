import { DayTableModel, DateRange, Slicer } from '@fullcalendar/core/internal';
import { TableSeg } from './TableSeg.js';
export declare class DayTableSlicer extends Slicer<TableSeg, [DayTableModel]> {
    forceDayIfListItem: boolean;
    sliceRange(dateRange: DateRange, dayTableModel: DayTableModel): TableSeg[];
}
//# sourceMappingURL=DayTableSlicer.d.ts.map