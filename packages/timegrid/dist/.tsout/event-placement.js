import { buildPositioning } from './seg-web.js';
export function computeSegVCoords(segs, colDate, slatCoords = null, eventMinHeight = 0) {
    let vcoords = [];
    if (slatCoords) {
        for (let i = 0; i < segs.length; i += 1) {
            let seg = segs[i];
            let spanStart = slatCoords.computeDateTop(seg.start, colDate);
            let spanEnd = Math.max(spanStart + (eventMinHeight || 0), // :(
            slatCoords.computeDateTop(seg.end, colDate));
            vcoords.push({
                start: Math.round(spanStart),
                end: Math.round(spanEnd), //
            });
        }
    }
    return vcoords;
}
export function computeFgSegPlacements(segs, segVCoords, // might not have for every seg
eventOrderStrict, eventMaxStack) {
    let segInputs = [];
    let dumbSegs = []; // segs without coords
    for (let i = 0; i < segs.length; i += 1) {
        let vcoords = segVCoords[i];
        if (vcoords) {
            segInputs.push({
                index: i,
                thickness: 1,
                span: vcoords,
            });
        }
        else {
            dumbSegs.push(segs[i]);
        }
    }
    let { segRects, hiddenGroups } = buildPositioning(segInputs, eventOrderStrict, eventMaxStack);
    let segPlacements = [];
    for (let segRect of segRects) {
        segPlacements.push({
            seg: segs[segRect.index],
            rect: segRect,
        });
    }
    for (let dumbSeg of dumbSegs) {
        segPlacements.push({ seg: dumbSeg, rect: null });
    }
    return { segPlacements, hiddenGroups };
}
//# sourceMappingURL=event-placement.js.map