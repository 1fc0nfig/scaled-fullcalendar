import { SegSpan, SegEntryGroup, DateMarker } from '@fullcalendar/core/internal';
import { TimeColsSeg } from './TimeColsSeg.js';
import { TimeColsSlatsCoords } from './TimeColsSlatsCoords.js';
import { SegWebRect } from './seg-web.js';
export interface TimeColFgSegPlacement {
    seg: TimeColsSeg;
    rect: SegWebRect | null;
}
export declare function computeSegVCoords(segs: TimeColsSeg[], colDate: DateMarker, slatCoords?: TimeColsSlatsCoords, eventMinHeight?: number): SegSpan[];
export declare function computeFgSegPlacements(segs: TimeColsSeg[], segVCoords: SegSpan[], // might not have for every seg
eventOrderStrict?: boolean, eventMaxStack?: number): {
    segPlacements: TimeColFgSegPlacement[];
    hiddenGroups: SegEntryGroup[];
};
//# sourceMappingURL=event-placement.d.ts.map