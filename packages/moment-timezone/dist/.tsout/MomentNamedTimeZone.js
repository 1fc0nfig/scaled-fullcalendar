import moment from 'moment-timezone';
import { NamedTimeZoneImpl } from '@fullcalendar/core/internal';
export class MomentNamedTimeZone extends NamedTimeZoneImpl {
    offsetForArray(a) {
        return moment.tz(a, this.timeZoneName).utcOffset();
    }
    timestampToArray(ms) {
        return moment.tz(ms, this.timeZoneName).toArray();
    }
}
//# sourceMappingURL=MomentNamedTimeZone.js.map