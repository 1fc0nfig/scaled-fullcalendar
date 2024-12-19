import { createElement } from '../preact.js';
import { findElements } from '../util/dom-manip.js';
import { computeSmallestCellWidth } from '../util/misc.js';
import { isPropsEqual } from '../util/object.js';
import { isArraysEqual } from '../util/array.js';
export function computeShrinkWidth(chunkEls) {
    let shrinkCells = findElements(chunkEls, '.fc-scrollgrid-shrink');
    let largestWidth = 0;
    for (let shrinkCell of shrinkCells) {
        largestWidth = Math.max(largestWidth, computeSmallestCellWidth(shrinkCell));
    }
    return Math.ceil(largestWidth); // <table> elements work best with integers. round up to ensure contents fits
}
export function getSectionHasLiquidHeight(props, sectionConfig) {
    return props.liquid && sectionConfig.liquid; // does the section do liquid-height? (need to have whole scrollgrid liquid-height as well)
}
export function getAllowYScrolling(props, sectionConfig) {
    return sectionConfig.maxHeight != null || // if its possible for the height to max out, we might need scrollbars
        getSectionHasLiquidHeight(props, sectionConfig); // if the section is liquid height, it might condense enough to require scrollbars
}
// TODO: ONLY use `arg`. force out internal function to use same API
export function renderChunkContent(sectionConfig, chunkConfig, arg, isHeader) {
    let { expandRows } = arg;
    let content = typeof chunkConfig.content === 'function' ?
        chunkConfig.content(arg) :
        createElement('table', {
            role: 'presentation',
            className: [
                chunkConfig.tableClassName,
                sectionConfig.syncRowHeights ? 'fc-scrollgrid-sync-table' : '',
            ].join(' '),
            style: {
                minWidth: arg.tableMinWidth,
                width: arg.clientWidth,
                height: expandRows ? arg.clientHeight : '', // css `height` on a <table> serves as a min-height
            },
        }, arg.tableColGroupNode, createElement(isHeader ? 'thead' : 'tbody', {
            role: 'presentation',
        }, typeof chunkConfig.rowContent === 'function'
            ? chunkConfig.rowContent(arg)
            : chunkConfig.rowContent));
    return content;
}
export function isColPropsEqual(cols0, cols1) {
    return isArraysEqual(cols0, cols1, isPropsEqual);
}
export function renderMicroColGroup(cols, shrinkWidth) {
    let colNodes = [];
    /*
    for ColProps with spans, it would have been great to make a single <col span="">
    HOWEVER, Chrome was getting messing up distributing the width to <td>/<th> elements with colspans.
    SOLUTION: making individual <col> elements makes Chrome behave.
    */
    for (let colProps of cols) {
        let span = colProps.span || 1;
        for (let i = 0; i < span; i += 1) {
            colNodes.push(createElement("col", { style: {
                    width: colProps.width === 'shrink' ? sanitizeShrinkWidth(shrinkWidth) : (colProps.width || ''),
                    minWidth: colProps.minWidth || '',
                } }));
        }
    }
    return createElement('colgroup', {}, ...colNodes);
}
export function sanitizeShrinkWidth(shrinkWidth) {
    /* why 4? if we do 0, it will kill any border, which are needed for computeSmallestCellWidth
    4 accounts for 2 2-pixel borders. TODO: better solution? */
    return shrinkWidth == null ? 4 : shrinkWidth;
}
export function hasShrinkWidth(cols) {
    for (let col of cols) {
        if (col.width === 'shrink') {
            return true;
        }
    }
    return false;
}
export function getScrollGridClassNames(liquid, context) {
    let classNames = [
        'fc-scrollgrid',
        context.theme.getClass('table'),
    ];
    if (liquid) {
        classNames.push('fc-scrollgrid-liquid');
    }
    return classNames;
}
export function getSectionClassNames(sectionConfig, wholeTableVGrow) {
    let classNames = [
        'fc-scrollgrid-section',
        `fc-scrollgrid-section-${sectionConfig.type}`,
        sectionConfig.className, // used?
    ];
    if (wholeTableVGrow && sectionConfig.liquid && sectionConfig.maxHeight == null) {
        classNames.push('fc-scrollgrid-section-liquid');
    }
    if (sectionConfig.isSticky) {
        classNames.push('fc-scrollgrid-section-sticky');
    }
    return classNames;
}
export function renderScrollShim(arg) {
    return (createElement("div", { className: "fc-scrollgrid-sticky-shim", style: {
            width: arg.clientWidth,
            minWidth: arg.tableMinWidth,
        } }));
}
export function getStickyHeaderDates(options) {
    let { stickyHeaderDates } = options;
    if (stickyHeaderDates == null || stickyHeaderDates === 'auto') {
        stickyHeaderDates = options.height === 'auto' || options.viewHeight === 'auto';
    }
    return stickyHeaderDates;
}
export function getStickyFooterScrollbar(options) {
    let { stickyFooterScrollbar } = options;
    if (stickyFooterScrollbar == null || stickyFooterScrollbar === 'auto') {
        stickyFooterScrollbar = options.height === 'auto' || options.viewHeight === 'auto';
    }
    return stickyFooterScrollbar;
}
//# sourceMappingURL=util.js.map