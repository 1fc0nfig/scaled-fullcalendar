import { BaseComponent } from './vdom-util.js';
import { ComponentChildren, Ref, createElement } from './preact.js';
import { CssDimValue } from './scrollgrid/util.js';
export interface ViewHarnessProps {
    elRef?: Ref<HTMLDivElement>;
    labeledById?: string;
    liquid?: boolean;
    height?: CssDimValue;
    aspectRatio?: number;
    children?: ComponentChildren;
}
interface ViewHarnessState {
    availableWidth: number | null;
}
export declare class ViewHarness extends BaseComponent<ViewHarnessProps, ViewHarnessState> {
    el: HTMLElement;
    state: ViewHarnessState;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleEl: (el: HTMLElement | null) => void;
    handleResize: () => void;
    updateAvailableWidth(): void;
}
export {};
//# sourceMappingURL=ViewHarness.d.ts.map