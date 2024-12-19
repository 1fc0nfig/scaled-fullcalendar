import { DateSelectionApi } from '@fullcalendar/core';
import { PointerDragEvent, CalendarContext } from '@fullcalendar/core/internal';
import { PointerDragging } from '../dnd/PointerDragging.js';
export declare class UnselectAuto {
    private context;
    documentPointer: PointerDragging;
    isRecentPointerDateSelect: boolean;
    matchesCancel: boolean;
    matchesEvent: boolean;
    constructor(context: CalendarContext);
    destroy(): void;
    onSelect: (selectInfo: DateSelectionApi) => void;
    onDocumentPointerDown: (pev: PointerDragEvent) => void;
    onDocumentPointerUp: (pev: PointerDragEvent) => void;
}
//# sourceMappingURL=UnselectAuto.d.ts.map