import { Duration } from '@fullcalendar/core';
import { DateMarker, DateEnv } from '@fullcalendar/core/internal';
export interface TimeSlatMeta {
    date: DateMarker;
    time: Duration;
    key: string;
    isoTimeStr: string;
    isLabeled: boolean;
}
export declare function buildSlatMetas(slotMinTime: Duration, slotMaxTime: Duration, explicitLabelInterval: Duration | null, slotDuration: Duration, dateEnv: DateEnv): TimeSlatMeta[];
//# sourceMappingURL=time-slat-meta.d.ts.map