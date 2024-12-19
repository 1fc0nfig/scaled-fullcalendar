import { BaseComponent, RefMap, PositionCache, } from '@fullcalendar/core/internal';
import { createElement, createRef, } from '@fullcalendar/core/preact';
import { TimeColsSlatsCoords } from './TimeColsSlatsCoords.js';
import { TimeColsSlatsBody } from './TimeColsSlatsBody.js';
/*
for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
*/
export class TimeColsSlats extends BaseComponent {
    constructor() {
        super(...arguments);
        this.rootElRef = createRef();
        this.slatElRefs = new RefMap();
    }
    render() {
        let { props, context } = this;
        return (createElement("div", { ref: this.rootElRef, className: "fc-timegrid-slots" },
            createElement("table", { "aria-hidden": true, className: context.theme.getClass('table'), style: {
                    minWidth: props.tableMinWidth,
                    width: props.clientWidth,
                    height: props.minHeight,
                } },
                props.tableColGroupNode /* relies on there only being a single <col> for the axis */,
                createElement(TimeColsSlatsBody, { slatElRefs: this.slatElRefs, axis: props.axis, slatMetas: props.slatMetas }))));
    }
    componentDidMount() {
        this.updateSizing();
    }
    componentDidUpdate() {
        this.updateSizing();
    }
    componentWillUnmount() {
        if (this.props.onCoords) {
            this.props.onCoords(null);
        }
    }
    updateSizing() {
        let { context, props } = this;
        if (props.onCoords &&
            props.clientWidth !== null // means sizing has stabilized
        ) {
            let rootEl = this.rootElRef.current;
            if (rootEl.offsetHeight) { // not hidden by css
                props.onCoords(new TimeColsSlatsCoords(new PositionCache(this.rootElRef.current, collectSlatEls(this.slatElRefs.currentMap, props.slatMetas), false, true), this.props.dateProfile, context.options.slotDuration));
            }
        }
    }
}
function collectSlatEls(elMap, slatMetas) {
    return slatMetas.map((slatMeta) => elMap[slatMeta.key]);
}
//# sourceMappingURL=TimeColsSlats.js.map