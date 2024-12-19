import { CalendarData } from './reducers/data-types.js';
import { createElement, VNode } from './preact.js';
import { InteractionSettingsInput } from './interactions/interaction.js';
import { DateComponent } from './component/DateComponent.js';
import { DelayedRunner } from './util/DelayedRunner.js';
import { PureComponent } from './vdom-util.js';
export interface CalendarContentProps extends CalendarData {
    forPrint: boolean;
    isHeightAuto: boolean;
}
export declare class CalendarContent extends PureComponent<CalendarContentProps> {
    private buildViewContext;
    private buildViewPropTransformers;
    private buildToolbarProps;
    private headerRef;
    private footerRef;
    private interactionsStore;
    private calendarInteractions;
    state: {
        viewLabelId: string;
    };
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: CalendarContentProps): void;
    componentWillUnmount(): void;
    buildAppendContent(): VNode;
    renderView(props: CalendarContentProps): createElement.JSX.Element;
    registerInteractiveComponent: (component: DateComponent<any>, settingsInput: InteractionSettingsInput) => void;
    unregisterInteractiveComponent: (component: DateComponent<any>) => void;
    resizeRunner: DelayedRunner;
    handleWindowResize: (ev: UIEvent) => void;
}
//# sourceMappingURL=CalendarContent.d.ts.map