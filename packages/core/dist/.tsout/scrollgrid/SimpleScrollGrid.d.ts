import { VNode, createElement } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
import { Scroller } from './Scroller.js';
import { RefMap } from '../util/RefMap.js';
import { ColProps, SectionConfig, renderMicroColGroup, ChunkConfig, CssDimValue } from './util.js';
export interface SimpleScrollGridProps {
    cols: ColProps[];
    sections: SimpleScrollGridSection[];
    liquid: boolean;
    collapsibleWidth: boolean;
    height?: CssDimValue;
}
export interface SimpleScrollGridSection extends SectionConfig {
    key: string;
    chunk?: ChunkConfig;
}
interface SimpleScrollGridState {
    shrinkWidth: number | null;
    forceYScrollbars: boolean;
    scrollerClientWidths: {
        [key: string]: number;
    };
    scrollerClientHeights: {
        [key: string]: number;
    };
}
export declare class SimpleScrollGrid extends BaseComponent<SimpleScrollGridProps, SimpleScrollGridState> {
    processCols: (a: any) => any;
    renderMicroColGroup: typeof renderMicroColGroup;
    scrollerRefs: RefMap<Scroller>;
    scrollerElRefs: RefMap<HTMLElement>;
    state: SimpleScrollGridState;
    render(): VNode;
    renderSection(sectionConfig: SimpleScrollGridSection, microColGroupNode: VNode, isHeader: boolean): createElement.JSX.Element;
    renderChunkTd(sectionConfig: SimpleScrollGridSection, microColGroupNode: VNode, chunkConfig: ChunkConfig, isHeader: boolean): createElement.JSX.Element;
    _handleScrollerEl(scrollerEl: HTMLElement | null, key: string): void;
    handleSizing: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    computeShrinkWidth(): number;
    computeScrollerDims(): {
        forceYScrollbars: boolean;
        scrollerClientWidths: {
            [index: string]: number;
        };
        scrollerClientHeights: {
            [index: string]: number;
        };
    };
}
export {};
//# sourceMappingURL=SimpleScrollGrid.d.ts.map