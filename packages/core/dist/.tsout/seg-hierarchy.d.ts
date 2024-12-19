export interface SegSpan {
    start: number;
    end: number;
}
export interface SegEntry {
    index: number;
    thickness?: number;
    span: SegSpan;
}
export interface SegInsertion {
    level: number;
    levelCoord: number;
    lateral: number;
    touchingLevel: number;
    touchingLateral: number;
    touchingEntry: SegEntry;
    stackCnt: number;
}
export interface SegRect extends SegEntry {
    thickness: number;
    levelCoord: number;
}
export interface SegEntryGroup {
    entries: SegEntry[];
    span: SegSpan;
}
export declare class SegHierarchy {
    private getEntryThickness;
    strictOrder: boolean;
    allowReslicing: boolean;
    maxCoord: number;
    maxStackCnt: number;
    levelCoords: number[];
    entriesByLevel: SegEntry[][];
    stackCnts: {
        [entryId: string]: number;
    };
    constructor(getEntryThickness?: (entry: SegEntry) => number);
    addSegs(inputs: SegEntry[]): SegEntry[];
    insertEntry(entry: SegEntry, hiddenEntries: SegEntry[]): void;
    isInsertionValid(insertion: SegInsertion, entry: SegEntry): boolean;
    handleInvalidInsertion(insertion: SegInsertion, entry: SegEntry, hiddenEntries: SegEntry[]): void;
    splitEntry(entry: SegEntry, barrier: SegEntry, hiddenEntries: SegEntry[]): void;
    insertEntryAt(entry: SegEntry, insertion: SegInsertion): void;
    findInsertion(newEntry: SegEntry): SegInsertion;
    toRects(): SegRect[];
}
export declare function getEntrySpanEnd(entry: SegEntry): number;
export declare function buildEntryKey(entry: SegEntry): string;
export declare function groupIntersectingEntries(entries: SegEntry[]): SegEntryGroup[];
export declare function joinSpans(span0: SegSpan, span1: SegSpan): SegSpan;
export declare function intersectSpans(span0: SegSpan, span1: SegSpan): SegSpan | null;
export declare function binarySearch<Item>(a: Item[], searchVal: number, getItemVal: (item: Item) => number): [number, number];
//# sourceMappingURL=seg-hierarchy.d.ts.map