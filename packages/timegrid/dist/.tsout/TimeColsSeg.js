export function splitSegsByCol(segs, colCnt) {
    let segsByCol = [];
    let i;
    for (i = 0; i < colCnt; i += 1) {
        segsByCol.push([]);
    }
    if (segs) {
        for (i = 0; i < segs.length; i += 1) {
            segsByCol[segs[i].col].push(segs[i]);
        }
    }
    return segsByCol;
}
export function splitInteractionByCol(ui, colCnt) {
    let byRow = [];
    if (!ui) {
        for (let i = 0; i < colCnt; i += 1) {
            byRow[i] = null;
        }
    }
    else {
        for (let i = 0; i < colCnt; i += 1) {
            byRow[i] = {
                affectedInstances: ui.affectedInstances,
                isEvent: ui.isEvent,
                segs: [],
            };
        }
        for (let seg of ui.segs) {
            byRow[seg.col].segs.push(seg);
        }
    }
    return byRow;
}
//# sourceMappingURL=TimeColsSeg.js.map