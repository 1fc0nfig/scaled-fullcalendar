import { DateMarker } from './datelib/marker.js';
import { Duration } from './datelib/duration.js';
import { DateRange, OpenDateRange, DateRangeInput } from './datelib/date-range.js';
import { DateEnv, DateInput } from './datelib/env.js';
import { CalendarImpl } from './api/CalendarImpl.js';
export interface DateProfile {
    currentDate: DateMarker;
    isValid: boolean;
    validRange: OpenDateRange;
    renderRange: DateRange;
    activeRange: DateRange | null;
    currentRange: DateRange;
    currentRangeUnit: string;
    isRangeAllDay: boolean;
    dateIncrement: Duration;
    slotMinTime: Duration;
    slotMaxTime: Duration;
}
export interface DateProfileGeneratorProps extends DateProfileOptions {
    dateProfileGeneratorClass: DateProfileGeneratorClass;
    duration: Duration;
    durationUnit: string;
    usesMinMaxTime: boolean;
    dateEnv: DateEnv;
    calendarApi: CalendarImpl;
}
export interface DateProfileOptions {
    slotMinTime: Duration;
    slotMaxTime: Duration;
    showNonCurrentDates?: boolean;
    dayCount?: number;
    dateAlignment?: string;
    dateIncrement?: Duration;
    hiddenDays?: number[];
    weekends?: boolean;
    nowInput?: DateInput | (() => DateInput);
    validRangeInput?: DateRangeInput | ((this: CalendarImpl, nowDate: Date) => DateRangeInput);
    visibleRangeInput?: DateRangeInput | ((this: CalendarImpl, nowDate: Date) => DateRangeInput);
    fixedWeekCount?: boolean;
}
export type DateProfileGeneratorClass = {
    new (props: DateProfileGeneratorProps): DateProfileGenerator;
};
export declare class DateProfileGenerator {
    protected props: DateProfileGeneratorProps;
    nowDate: DateMarker;
    isHiddenDayHash: boolean[];
    constructor(props: DateProfileGeneratorProps);
    buildPrev(currentDateProfile: DateProfile, currentDate: DateMarker, forceToValid?: boolean): DateProfile;
    buildNext(currentDateProfile: DateProfile, currentDate: DateMarker, forceToValid?: boolean): DateProfile;
    build(currentDate: DateMarker, direction?: any, forceToValid?: boolean): DateProfile;
    buildValidRange(): OpenDateRange;
    buildCurrentRangeInfo(date: DateMarker, direction: any): {
        duration: any;
        unit: any;
        range: any;
    };
    getFallbackDuration(): Duration;
    adjustActiveRange(range: DateRange): {
        start: Date;
        end: Date;
    };
    buildRangeFromDuration(date: DateMarker, direction: any, duration: Duration, unit: any): any;
    buildRangeFromDayCount(date: DateMarker, direction: any, dayCount: any): {
        start: Date;
        end: Date;
    };
    buildCustomVisibleRange(date: DateMarker): DateRange;
    buildRenderRange(currentRange: DateRange, currentRangeUnit: any, isRangeAllDay: any): DateRange;
    buildDateIncrement(fallback: any): Duration;
    refineRange(rangeInput: DateRangeInput | undefined): DateRange | null;
    initHiddenDays(): void;
    trimHiddenDays(range: DateRange): DateRange | null;
    isHiddenDay(day: any): boolean;
    skipHiddenDays(date: DateMarker, inc?: number, isExclusive?: boolean): Date;
}
//# sourceMappingURL=DateProfileGenerator.d.ts.map