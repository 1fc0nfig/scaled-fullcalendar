import { Slicer } from '@fullcalendar/core/internal';
export class DayTableSlicer extends Slicer {
    constructor() {
        super(...arguments);
        this.forceDayIfListItem = true;
    }
    sliceRange(dateRange, dayTableModel) {
        return dayTableModel.sliceRange(dateRange);
    }
}
//# sourceMappingURL=DayTableSlicer.js.map