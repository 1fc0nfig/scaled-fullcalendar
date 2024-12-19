import { BaseComponent } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
import { TimeColsAxisCell } from './TimeColsAxisCell.js';
export class TimeBodyAxis extends BaseComponent {
    render() {
        return this.props.slatMetas.map((slatMeta) => (createElement("tr", { key: slatMeta.key },
            createElement(TimeColsAxisCell, Object.assign({}, slatMeta)))));
    }
}
//# sourceMappingURL=TimeBodyAxis.js.map