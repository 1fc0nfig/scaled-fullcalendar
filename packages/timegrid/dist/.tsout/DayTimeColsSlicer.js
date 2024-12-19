import { intersectRanges, Slicer } from '@fullcalendar/core/internal';
export class DayTimeColsSlicer extends Slicer {
    sliceRange(range, dayRanges) {
        let segs = [];
        for (let col = 0; col < dayRanges.length; col += 1) {
            let segRange = intersectRanges(range, dayRanges[col]);
            if (segRange) {
                segs.push({
                    start: segRange.start,
                    end: segRange.end,
                    isStart: segRange.start.valueOf() === range.start.valueOf(),
                    isEnd: segRange.end.valueOf() === range.end.valueOf(),
                    col,
                });
            }
        }
        return segs;
    }
}
//# sourceMappingURL=DayTimeColsSlicer.js.map