import { createElement } from '../preact.js';
import { getDateMeta, getDayClassNames } from '../component/date-rendering.js';
import { createFormatter } from '../datelib/formatting.js';
import { formatDayString } from '../datelib/formatting-utils.js';
import { BaseComponent } from '../vdom-util.js';
import { memoizeObjArg } from '../util/memoize.js';
import { ContentContainer } from '../content-inject/ContentContainer.js';
import { hasCustomRenderingHandler } from '../content-inject/ContentInjector.js';
const DAY_NUM_FORMAT = createFormatter({ day: 'numeric' });
export class DayCellContainer extends BaseComponent {
    constructor() {
        super(...arguments);
        this.refineRenderProps = memoizeObjArg(refineRenderProps);
    }
    render() {
        let { props, context } = this;
        let { options } = context;
        let renderProps = this.refineRenderProps({
            date: props.date,
            dateProfile: props.dateProfile,
            todayRange: props.todayRange,
            isMonthStart: props.isMonthStart || false,
            showDayNumber: props.showDayNumber,
            extraRenderProps: props.extraRenderProps,
            viewApi: context.viewApi,
            dateEnv: context.dateEnv,
            monthStartFormat: options.monthStartFormat,
        });
        return (createElement(ContentContainer, Object.assign({}, props /* includes children */, { elClasses: [
                ...getDayClassNames(renderProps, context.theme),
                ...(props.elClasses || []),
            ], elAttrs: Object.assign(Object.assign({}, props.elAttrs), (renderProps.isDisabled ? {} : { 'data-date': formatDayString(props.date) })), renderProps: renderProps, generatorName: "dayCellContent", customGenerator: options.dayCellContent, defaultGenerator: props.defaultGenerator, classNameGenerator: 
            // don't use custom classNames if disabled
            renderProps.isDisabled ? undefined : options.dayCellClassNames, didMount: options.dayCellDidMount, willUnmount: options.dayCellWillUnmount })));
    }
}
export function hasCustomDayCellContent(options) {
    return Boolean(options.dayCellContent || hasCustomRenderingHandler('dayCellContent', options));
}
function refineRenderProps(raw) {
    let { date, dateEnv, dateProfile, isMonthStart } = raw;
    let dayMeta = getDateMeta(date, raw.todayRange, null, dateProfile);
    let dayNumberText = raw.showDayNumber ? (dateEnv.format(date, isMonthStart ? raw.monthStartFormat : DAY_NUM_FORMAT)) : '';
    return Object.assign(Object.assign(Object.assign({ date: dateEnv.toDate(date), view: raw.viewApi }, dayMeta), { isMonthStart,
        dayNumberText }), raw.extraRenderProps);
}
//# sourceMappingURL=DayCellContainer.js.map