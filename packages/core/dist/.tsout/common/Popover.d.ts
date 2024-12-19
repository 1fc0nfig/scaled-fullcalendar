import { Dictionary } from '../options.js';
import { ComponentChildren, Ref } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
export interface PopoverProps {
    elRef?: Ref<HTMLElement>;
    id: string;
    title: string;
    extraClassNames?: string[];
    extraAttrs?: Dictionary;
    parentEl: HTMLElement;
    alignmentEl: HTMLElement;
    alignGridTop?: boolean;
    children?: ComponentChildren;
    onClose?: () => void;
}
export declare class Popover extends BaseComponent<PopoverProps> {
    private rootEl;
    state: {
        titleId: string;
    };
    render(): any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleRootEl: (el: HTMLElement | null) => void;
    handleDocumentMouseDown: (ev: any) => void;
    handleDocumentKeyDown: (ev: any) => void;
    handleCloseClick: () => void;
    private updateSize;
}
//# sourceMappingURL=Popover.d.ts.map