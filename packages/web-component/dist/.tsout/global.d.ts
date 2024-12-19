import { FullCalendarElement } from './FullCalendarElement.js';
type FullCalendarElementType = typeof FullCalendarElement;
declare global {
    var FullCalendarElement: FullCalendarElementType;
    interface HTMLElementTagNameMap {
        'full-calendar': FullCalendarElement;
    }
}
export {};
//# sourceMappingURL=global.d.ts.map