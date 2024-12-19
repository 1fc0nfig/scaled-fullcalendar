import { ComponentChildren } from './preact.js';
import { BaseComponent } from './vdom-util.js';
import { CssDimValue } from './scrollgrid/util.js';
import { CalendarOptions, CalendarListeners } from './options.js';
import { Theme } from './theme/Theme.js';
import { Emitter } from './common/Emitter.js';
export interface CalendarRootProps {
    options: CalendarOptions;
    theme: Theme;
    emitter: Emitter<CalendarListeners>;
    children: (classNames: string[], height: CssDimValue, isHeightAuto: boolean, forPrint: boolean) => ComponentChildren;
}
interface CalendarRootState {
    forPrint: boolean;
}
export declare class CalendarRoot extends BaseComponent<CalendarRootProps, CalendarRootState> {
    state: {
        forPrint: boolean;
    };
    render(): ComponentChildren;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleBeforePrint: () => void;
    handleAfterPrint: () => void;
}
export {};
//# sourceMappingURL=CalendarRoot.d.ts.map