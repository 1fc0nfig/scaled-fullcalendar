import { getDayClassNames, getDateMeta } from '../component/date-rendering.js';
import { createElement } from '../preact.js';
import { formatDayString } from '../datelib/formatting-utils.js';
import { BaseComponent } from '../vdom-util.js';
import { buildNavLinkAttrs } from './nav-link.js';
import { CLASS_NAME, renderInner } from './table-cell-util.js';
import { ContentContainer } from '../content-inject/ContentContainer.js';
// BAD name for this class now. used in the Header
export class TableDateCell extends BaseComponent {
    render() {
        let { dateEnv, options, theme, viewApi } = this.context;
        let { props } = this;
        let { date, dateProfile } = props;
        let dayMeta = getDateMeta(date, props.todayRange, null, dateProfile);
        let classNames = [CLASS_NAME].concat(getDayClassNames(dayMeta, theme));
        let text = dateEnv.format(date, props.dayHeaderFormat);
        // if colCnt is 1, we are already in a day-view and don't need a navlink
        let navLinkAttrs = (!dayMeta.isDisabled && props.colCnt > 1)
            ? buildNavLinkAttrs(this.context, date)
            : {};
        let renderProps = Object.assign(Object.assign(Object.assign({ date: dateEnv.toDate(date), view: viewApi }, props.extraRenderProps), { text }), dayMeta);
        return (createElement(ContentContainer, { elTag: "th", elClasses: classNames, elAttrs: Object.assign({ role: 'columnheader', colSpan: props.colSpan, 'data-date': !dayMeta.isDisabled ? formatDayString(date) : undefined }, props.extraDataAttrs), renderProps: renderProps, generatorName: "dayHeaderContent", customGenerator: options.dayHeaderContent, defaultGenerator: renderInner, classNameGenerator: options.dayHeaderClassNames, didMount: options.dayHeaderDidMount, willUnmount: options.dayHeaderWillUnmount }, (InnerContainer) => (createElement("div", { className: "fc-scrollgrid-sync-inner" }, !dayMeta.isDisabled && (createElement(InnerContainer, { elTag: "a", elAttrs: navLinkAttrs, elClasses: [
                'fc-col-header-cell-cushion',
                props.isSticky && 'fc-sticky',
            ] }))))));
    }
}
//# sourceMappingURL=TableDateCell.js.map