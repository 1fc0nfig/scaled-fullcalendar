import { SectionConfig, ChunkConfig, ColProps, CssDimValue } from './util.js';
import { Component, Ref } from '../preact.js';
import { ViewContext } from '../ViewContext.js';
export interface ScrollGridProps {
    elRef?: Ref<any>;
    colGroups?: ColGroupConfig[];
    sections: ScrollGridSectionConfig[];
    liquid: boolean;
    forPrint: boolean;
    collapsibleWidth: boolean;
}
export interface ScrollGridSectionConfig extends SectionConfig {
    key: string;
    chunks?: ScrollGridChunkConfig[];
}
export interface ScrollGridChunkConfig extends ChunkConfig {
    key: string;
}
export interface ColGroupConfig {
    width?: CssDimValue;
    cols: ColProps[];
}
export type ScrollGridImpl = {
    new (props: ScrollGridProps, context: ViewContext): Component<ScrollGridProps>;
};
//# sourceMappingURL=ScrollGridImpl.d.ts.map