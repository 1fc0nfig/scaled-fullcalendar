import { Store } from './Store.js';
import { ElProps } from './ContentInjector.js';
export type CustomRenderingHandler<RenderProps> = (customRender: CustomRendering<RenderProps>) => void;
export interface CustomRendering<RenderProps> extends ElProps {
    id: string;
    isActive: boolean;
    containerEl: HTMLElement;
    reportNewContainerEl: (el: HTMLElement | null) => void;
    generatorName: string;
    generatorMeta: any;
    renderProps: RenderProps;
}
export declare class CustomRenderingStore<RenderProps> extends Store<Map<string, CustomRendering<RenderProps>>> {
    private map;
    handle(customRendering: CustomRendering<RenderProps>): void;
}
//# sourceMappingURL=CustomRenderingStore.d.ts.map