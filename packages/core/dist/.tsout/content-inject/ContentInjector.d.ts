import { ComponentChild, JSX, Ref } from '../preact.js';
import { CustomContentGenerator } from '../common/render-hook.js';
import { BaseComponent } from '../vdom-util.js';
import { ViewOptions } from '../options.js';
export type ElRef = Ref<HTMLElement>;
export type ElAttrs = JSX.HTMLAttributes & JSX.SVGAttributes & {
    ref?: ElRef;
} & Record<string, any>;
export interface ElAttrsProps {
    elRef?: ElRef;
    elClasses?: string[];
    elStyle?: JSX.CSSProperties;
    elAttrs?: ElAttrs;
}
export interface ElProps extends ElAttrsProps {
    elTag: string;
}
export interface ContentGeneratorProps<RenderProps> {
    renderProps: RenderProps;
    generatorName: string | undefined;
    customGenerator?: CustomContentGenerator<RenderProps>;
    defaultGenerator?: (renderProps: RenderProps) => ComponentChild;
}
export type ContentInjectorProps<RenderProps> = ElProps & ContentGeneratorProps<RenderProps> & {
    renderId: number;
};
export declare class ContentInjector<RenderProps> extends BaseComponent<ContentInjectorProps<RenderProps>> {
    private id;
    private queuedDomNodes;
    private currentDomNodes;
    private currentGeneratorMeta;
    render(): import("preact").VNode<any>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    private triggerCustomRendering;
    private handleEl;
    private updateElRef;
    private applyQueueudDomNodes;
}
export declare function hasCustomRenderingHandler(generatorName: string | undefined, options: ViewOptions): boolean;
export declare function buildElAttrs(props: ElAttrsProps, extraClassNames?: string[], elRef?: ElRef): ElAttrs;
//# sourceMappingURL=ContentInjector.d.ts.map