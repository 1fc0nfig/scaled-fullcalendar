import { BaseComponent, getDateMeta, getDayClassNames, formatDayString, buildNavLinkAttrs, getUniqueDomId, ContentContainer, } from '@fullcalendar/core/internal';
import { createElement, Fragment } from '@fullcalendar/core/preact';
export class ListViewHeaderRow extends BaseComponent {
    constructor() {
        super(...arguments);
        this.state = {
            textId: getUniqueDomId(),
        };
    }
    render() {
        let { theme, dateEnv, options, viewApi } = this.context;
        let { cellId, dayDate, todayRange } = this.props;
        let { textId } = this.state;
        let dayMeta = getDateMeta(dayDate, todayRange);
        // will ever be falsy?
        let text = options.listDayFormat ? dateEnv.format(dayDate, options.listDayFormat) : '';
        // will ever be falsy? also, BAD NAME "alt"
        let sideText = options.listDaySideFormat ? dateEnv.format(dayDate, options.listDaySideFormat) : '';
        let renderProps = Object.assign({ date: dateEnv.toDate(dayDate), view: viewApi, textId,
            text,
            sideText, navLinkAttrs: buildNavLinkAttrs(this.context, dayDate), sideNavLinkAttrs: buildNavLinkAttrs(this.context, dayDate, 'day', false) }, dayMeta);
        // TODO: make a reusable HOC for dayHeader (used in daygrid/timegrid too)
        return (createElement(ContentContainer, { elTag: "tr", elClasses: [
                'fc-list-day',
                ...getDayClassNames(dayMeta, theme),
            ], elAttrs: {
                'data-date': formatDayString(dayDate),
            }, renderProps: renderProps, generatorName: "dayHeaderContent", customGenerator: options.dayHeaderContent, defaultGenerator: renderInnerContent, classNameGenerator: options.dayHeaderClassNames, didMount: options.dayHeaderDidMount, willUnmount: options.dayHeaderWillUnmount }, (InnerContent) => ( // TODO: force-hide top border based on :first-child
        createElement("th", { scope: "colgroup", colSpan: 3, id: cellId, "aria-labelledby": textId },
            createElement(InnerContent, { elTag: "div", elClasses: [
                    'fc-list-day-cushion',
                    theme.getClass('tableCellShaded'),
                ] })))));
    }
}
function renderInnerContent(props) {
    return (createElement(Fragment, null,
        props.text && (createElement("a", Object.assign({ id: props.textId, className: "fc-list-day-text" }, props.navLinkAttrs), props.text)),
        props.sideText && ( /* not keyboard tabbable */createElement("a", Object.assign({ "aria-hidden": true, className: "fc-list-day-side-text" }, props.sideNavLinkAttrs), props.sideText))));
}
//# sourceMappingURL=ListViewHeaderRow.js.map