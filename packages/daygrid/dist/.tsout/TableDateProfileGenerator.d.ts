import { DateProfileGenerator, DateRange, DateEnv } from '@fullcalendar/core/internal';
export declare class TableDateProfileGenerator extends DateProfileGenerator {
    buildRenderRange(currentRange: any, currentRangeUnit: any, isRangeAllDay: any): DateRange;
}
export declare function buildDayTableRenderRange(props: {
    currentRange: DateRange;
    snapToWeek: boolean;
    fixedWeekCount: boolean;
    dateEnv: DateEnv;
}): DateRange;
//# sourceMappingURL=TableDateProfileGenerator.d.ts.map