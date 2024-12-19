import { createElement } from './preact.js';
import { BaseComponent } from './vdom-util.js';
import { ToolbarModel, ToolbarWidget } from './toolbar-struct.js';
import { ToolbarContent } from './ToolbarSection.js';
export interface ToolbarProps extends ToolbarContent {
    extraClassName: string;
    model: ToolbarModel;
    titleId: string;
}
export declare class Toolbar extends BaseComponent<ToolbarProps> {
    render(): createElement.JSX.Element;
    renderSection(key: string, widgetGroups: ToolbarWidget[][]): createElement.JSX.Element;
}
//# sourceMappingURL=Toolbar.d.ts.map