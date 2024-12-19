import { DateComponent, ViewProps } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
interface MultiMonthViewState {
    clientWidth?: number;
    clientHeight?: number;
    monthHPadding?: number;
}
export declare class MultiMonthView extends DateComponent<ViewProps, MultiMonthViewState> {
    private splitDateProfileByMonth;
    private buildMonthFormat;
    private scrollElRef;
    private firstMonthElRef;
    private needsScrollReset;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: ViewProps): void;
    componentWillUnmount(): void;
    handleSizing: (isForced: boolean) => void;
    updateSize(): void;
    requestScrollReset(): void;
    flushScrollReset(): void;
    shouldComponentUpdate(): boolean;
}
export {};
//# sourceMappingURL=MultiMonthView.d.ts.map