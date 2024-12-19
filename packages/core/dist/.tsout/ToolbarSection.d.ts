import { BaseComponent } from './vdom-util.js';
import { ToolbarWidget } from './toolbar-struct.js';
export interface ToolbarContent {
    title: string;
    titleId: string;
    navUnit: string;
    activeButton: string;
    isTodayEnabled: boolean;
    isPrevEnabled: boolean;
    isNextEnabled: boolean;
}
export interface ToolbarSectionProps extends ToolbarContent {
    widgetGroups: ToolbarWidget[][];
}
export declare class ToolbarSection extends BaseComponent<ToolbarSectionProps> {
    render(): any;
    renderWidgetGroup(widgetGroup: ToolbarWidget[]): any;
}
//# sourceMappingURL=ToolbarSection.d.ts.map