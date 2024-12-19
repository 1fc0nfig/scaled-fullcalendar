import { BaseComponent } from '../vdom-util.js';
import { computeFallbackHeaderFormat } from './table-utils.js';
import { createElement } from '../preact.js';
import { TableDateCell } from './TableDateCell.js';
import { TableDowCell } from './TableDowCell.js';
import { NowTimer } from '../NowTimer.js';
import { memoize } from '../util/memoize.js';
export class DayHeader extends BaseComponent {
    constructor() {
        super(...arguments);
        this.createDayHeaderFormatter = memoize(createDayHeaderFormatter);
    }
    render() {
        let { context } = this;
        let { dates, dateProfile, datesRepDistinctDays, renderIntro } = this.props;
        let dayHeaderFormat = this.createDayHeaderFormatter(context.options.dayHeaderFormat, datesRepDistinctDays, dates.length);
        return (createElement(NowTimer, { unit: "day" }, (nowDate, todayRange) => (createElement("tr", { role: "row" },
            renderIntro && renderIntro('day'),
            dates.map((date) => (datesRepDistinctDays ? (createElement(TableDateCell, { key: date.toISOString(), date: date, dateProfile: dateProfile, todayRange: todayRange, colCnt: dates.length, dayHeaderFormat: dayHeaderFormat })) : (createElement(TableDowCell, { key: date.getUTCDay(), dow: date.getUTCDay(), dayHeaderFormat: dayHeaderFormat }))))))));
    }
}
function createDayHeaderFormatter(explicitFormat, datesRepDistinctDays, dateCnt) {
    return explicitFormat || computeFallbackHeaderFormat(datesRepDistinctDays, dateCnt);
}
//# sourceMappingURL=DayHeader.js.map