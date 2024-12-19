import { SimpleScrollGrid, ViewContainer, DateComponent, renderScrollShim, getStickyHeaderDates, getStickyFooterScrollbar, } from '@fullcalendar/core/internal';
import { createElement, createRef, } from '@fullcalendar/core/preact';
/* An abstract class for the daygrid views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a Table subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.
export class TableView extends DateComponent {
    constructor() {
        super(...arguments);
        this.headerElRef = createRef();
    }
    renderSimpleLayout(headerRowContent, bodyContent) {
        let { props, context } = this;
        let sections = [];
        let stickyHeaderDates = getStickyHeaderDates(context.options);
        if (headerRowContent) {
            sections.push({
                type: 'header',
                key: 'header',
                isSticky: stickyHeaderDates,
                chunk: {
                    elRef: this.headerElRef,
                    tableClassName: 'fc-col-header',
                    rowContent: headerRowContent,
                },
            });
        }
        sections.push({
            type: 'body',
            key: 'body',
            liquid: true,
            chunk: { content: bodyContent },
        });
        return (createElement(ViewContainer, { elClasses: ['fc-daygrid'], viewSpec: context.viewSpec },
            createElement(SimpleScrollGrid, { liquid: !props.isHeightAuto && !props.forPrint, collapsibleWidth: props.forPrint, cols: [] /* TODO: make optional? */, sections: sections })));
    }
    renderHScrollLayout(headerRowContent, bodyContent, colCnt, dayMinWidth) {
        let ScrollGrid = this.context.pluginHooks.scrollGridImpl;
        if (!ScrollGrid) {
            throw new Error('No ScrollGrid implementation');
        }
        let { props, context } = this;
        let stickyHeaderDates = !props.forPrint && getStickyHeaderDates(context.options);
        let stickyFooterScrollbar = !props.forPrint && getStickyFooterScrollbar(context.options);
        let sections = [];
        if (headerRowContent) {
            sections.push({
                type: 'header',
                key: 'header',
                isSticky: stickyHeaderDates,
                chunks: [{
                        key: 'main',
                        elRef: this.headerElRef,
                        tableClassName: 'fc-col-header',
                        rowContent: headerRowContent,
                    }],
            });
        }
        sections.push({
            type: 'body',
            key: 'body',
            liquid: true,
            chunks: [{
                    key: 'main',
                    content: bodyContent,
                }],
        });
        if (stickyFooterScrollbar) {
            sections.push({
                type: 'footer',
                key: 'footer',
                isSticky: true,
                chunks: [{
                        key: 'main',
                        content: renderScrollShim,
                    }],
            });
        }
        return (createElement(ViewContainer, { elClasses: ['fc-daygrid'], viewSpec: context.viewSpec },
            createElement(ScrollGrid, { liquid: !props.isHeightAuto && !props.forPrint, forPrint: props.forPrint, collapsibleWidth: props.forPrint, colGroups: [{ cols: [{ span: colCnt, minWidth: dayMinWidth }] }], sections: sections })));
    }
}
//# sourceMappingURL=TableView.js.map