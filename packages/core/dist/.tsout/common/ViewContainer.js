import { createElement } from '../preact.js';
import { BaseComponent } from '../vdom-util.js';
import { ContentContainer } from '../content-inject/ContentContainer.js';
export class ViewContainer extends BaseComponent {
    render() {
        let { props, context } = this;
        let { options } = context;
        let renderProps = { view: context.viewApi };
        return (createElement(ContentContainer, Object.assign({}, props, { elTag: props.elTag || 'div', elClasses: [
                ...buildViewClassNames(props.viewSpec),
                ...(props.elClasses || []),
            ], renderProps: renderProps, classNameGenerator: options.viewClassNames, generatorName: undefined, didMount: options.viewDidMount, willUnmount: options.viewWillUnmount }), () => props.children));
    }
}
export function buildViewClassNames(viewSpec) {
    return [
        `fc-${viewSpec.type}-view`,
        'fc-view',
    ];
}
//# sourceMappingURL=ViewContainer.js.map