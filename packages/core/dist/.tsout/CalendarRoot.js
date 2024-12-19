import { flushSync } from './preact.js';
import { BaseComponent } from './vdom-util.js';
import { getCanVGrowWithinCell } from './util/table-styling.js';
export class CalendarRoot extends BaseComponent {
    constructor() {
        super(...arguments);
        this.state = {
            forPrint: false,
        };
        this.handleBeforePrint = () => {
            flushSync(() => {
                this.setState({ forPrint: true });
            });
        };
        this.handleAfterPrint = () => {
            flushSync(() => {
                this.setState({ forPrint: false });
            });
        };
    }
    render() {
        let { props } = this;
        let { options } = props;
        let { forPrint } = this.state;
        let isHeightAuto = forPrint || options.height === 'auto' || options.contentHeight === 'auto';
        let height = (!isHeightAuto && options.height != null) ? options.height : '';
        let classNames = [
            'fc',
            forPrint ? 'fc-media-print' : 'fc-media-screen',
            `fc-direction-${options.direction}`,
            props.theme.getClass('root'),
        ];
        if (!getCanVGrowWithinCell()) {
            classNames.push('fc-liquid-hack');
        }
        return props.children(classNames, height, isHeightAuto, forPrint);
    }
    componentDidMount() {
        let { emitter } = this.props;
        emitter.on('_beforeprint', this.handleBeforePrint);
        emitter.on('_afterprint', this.handleAfterPrint);
    }
    componentWillUnmount() {
        let { emitter } = this.props;
        emitter.off('_beforeprint', this.handleBeforePrint);
        emitter.off('_afterprint', this.handleAfterPrint);
    }
}
//# sourceMappingURL=CalendarRoot.js.map