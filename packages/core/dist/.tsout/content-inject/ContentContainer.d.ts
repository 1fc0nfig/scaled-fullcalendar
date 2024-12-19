import { Component, FunctionalComponent, ComponentChildren } from '../preact.js';
import { ClassNamesGenerator } from '../common/render-hook.js';
import { ContentGeneratorProps, ElAttrsProps, ElProps, ElAttrs } from './ContentInjector.js';
export type ContentContainerProps<RenderProps> = ElAttrsProps & ContentGeneratorProps<RenderProps> & {
    elTag?: string;
    classNameGenerator: ClassNamesGenerator<RenderProps> | undefined;
    didMount: ((renderProps: RenderProps & {
        el: HTMLElement;
    }) => void) | undefined;
    willUnmount: ((renderProps: RenderProps & {
        el: HTMLElement;
    }) => void) | undefined;
    children?: InnerContainerFunc<RenderProps>;
};
export declare class ContentContainer<RenderProps> extends Component<ContentContainerProps<RenderProps>> {
    static contextType: import("preact").Context<number>;
    didMountMisfire?: boolean;
    context: number;
    el: HTMLElement;
    InnerContent: any;
    render(): ComponentChildren;
    handleEl: (el: HTMLElement) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
export type InnerContainerComponent = FunctionalComponent<ElProps>;
export type InnerContainerFunc<RenderProps> = (InnerContainer: InnerContainerComponent, renderProps: RenderProps, elAttrs: ElAttrs) => ComponentChildren;
//# sourceMappingURL=ContentContainer.d.ts.map