import { SegEntry, SegRect, SegEntryGroup } from '@fullcalendar/core/internal';
export interface SegWebRect extends SegRect {
    stackDepth: number;
    stackForward: number;
}
export declare function buildPositioning(segInputs: SegEntry[], strictOrder?: boolean, maxStackCnt?: number): {
    segRects: SegWebRect[];
    hiddenGroups: SegEntryGroup[];
};
//# sourceMappingURL=seg-web.d.ts.map