import { CssDimValue } from '@fullcalendar/core';
import { DateComponent, ViewProps, DateFormatter } from '@fullcalendar/core/internal';
import { createElement, Ref } from '@fullcalendar/core/preact';
export interface SingleMonthProps extends ViewProps {
    elRef?: Ref<HTMLDivElement>;
    isoDateStr?: string;
    titleFormat: DateFormatter;
    width: CssDimValue;
    tableWidth: number | null;
    clientWidth: number | null;
    clientHeight: number | null;
}
interface SingleMonthState {
    labelId: string;
}
export declare class SingleMonth extends DateComponent<SingleMonthProps, SingleMonthState> {
    private buildDayTableModel;
    private slicer;
    state: SingleMonthState;
    render(): createElement.JSX.Element;
}
export {};
//# sourceMappingURL=SingleMonth.d.ts.map