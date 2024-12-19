import { BaseComponent, ContentContainer, } from '@fullcalendar/core/internal';
import { createElement, } from '@fullcalendar/core/preact';
import { TimeColsAxisCell } from './TimeColsAxisCell.js';
export class TimeColsSlatsBody extends BaseComponent {
    render() {
        let { props, context } = this;
        let { options } = context;
        let { slatElRefs } = props;
        return (createElement("tbody", null, props.slatMetas.map((slatMeta, i) => {
            let renderProps = {
                time: slatMeta.time,
                date: context.dateEnv.toDate(slatMeta.date),
                view: context.viewApi,
            };
            return (createElement("tr", { key: slatMeta.key, ref: slatElRefs.createRef(slatMeta.key) },
                props.axis && (createElement(TimeColsAxisCell, Object.assign({}, slatMeta))),
                createElement(ContentContainer, { elTag: "td", elClasses: [
                        'fc-timegrid-slot',
                        'fc-timegrid-slot-lane',
                        !slatMeta.isLabeled && 'fc-timegrid-slot-minor',
                    ], elAttrs: {
                        'data-time': slatMeta.isoTimeStr,
                    }, renderProps: renderProps, generatorName: "slotLaneContent", customGenerator: options.slotLaneContent, classNameGenerator: options.slotLaneClassNames, didMount: options.slotLaneDidMount, willUnmount: options.slotLaneWillUnmount })));
        })));
    }
}
//# sourceMappingURL=TimeColsSlatsBody.js.map