import { CalendarOptions } from './options.js';
import { CalendarImpl } from './api/CalendarImpl.js';
export declare class Calendar extends CalendarImpl {
    el: HTMLElement;
    private currentData;
    private renderRunner;
    private isRendering;
    private isRendered;
    private currentClassNames;
    private customContentRenderId;
    constructor(el: HTMLElement, optionOverrides?: CalendarOptions);
    private handleAction;
    private handleData;
    private handleRenderRequest;
    render(): void;
    destroy(): void;
    updateSize(): void;
    batchRendering(func: any): void;
    pauseRendering(): void;
    resumeRendering(): void;
    resetOptions(optionOverrides: any, changedOptionNames?: string[]): void;
    private setClassNames;
    private setHeight;
}
//# sourceMappingURL=Calendar.d.ts.map