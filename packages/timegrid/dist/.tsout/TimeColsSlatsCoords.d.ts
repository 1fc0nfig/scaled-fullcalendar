import { Duration } from '@fullcalendar/core';
import { PositionCache, DateMarker, DateProfile } from '@fullcalendar/core/internal';
export declare class TimeColsSlatsCoords {
    positions: PositionCache;
    private dateProfile;
    private slotDuration;
    constructor(positions: PositionCache, dateProfile: DateProfile, slotDuration: Duration);
    safeComputeTop(date: DateMarker): number;
    computeDateTop(when: DateMarker, startOfDayDate?: DateMarker): number;
    computeTimeTop(duration: Duration): number;
}
//# sourceMappingURL=TimeColsSlatsCoords.d.ts.map