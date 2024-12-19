import { ViewContextType } from '../ViewContext.js';
import { createElement } from '../preact.js';
import { ContentContainer } from '../content-inject/ContentContainer.js';
export const NowIndicatorContainer = (props) => (createElement(ViewContextType.Consumer, null, (context) => {
    let { options } = context;
    let renderProps = {
        isAxis: props.isAxis,
        date: context.dateEnv.toDate(props.date),
        view: context.viewApi,
    };
    return (createElement(ContentContainer, Object.assign({}, props /* includes children */, { elTag: props.elTag || 'div', renderProps: renderProps, generatorName: "nowIndicatorContent", customGenerator: options.nowIndicatorContent, classNameGenerator: options.nowIndicatorClassNames, didMount: options.nowIndicatorDidMount, willUnmount: options.nowIndicatorWillUnmount })));
}));
//# sourceMappingURL=NowIndicatorContainer.js.map