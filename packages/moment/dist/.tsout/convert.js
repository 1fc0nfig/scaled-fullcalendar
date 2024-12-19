import moment from 'moment';
import { CalendarImpl } from '@fullcalendar/core/internal';
export function toMoment(date, calendar) {
    if (!(calendar instanceof CalendarImpl)) {
        throw new Error('must supply a CalendarApi instance');
    }
    let { dateEnv } = calendar.getCurrentData();
    return convertToMoment(date, dateEnv.timeZone, null, dateEnv.locale.codes[0]);
}
export function toMomentDuration(fcDuration) {
    return moment.duration(fcDuration); // moment accepts all the props that fc.Duration already has!
}
// Internal Utils
export function convertToMoment(input, timeZone, timeZoneOffset, locale) {
    let mom;
    if (timeZone === 'local') {
        mom = moment(input);
    }
    else if (timeZone === 'UTC') {
        mom = moment.utc(input);
    }
    else if (moment.tz) {
        mom = moment.tz(input, timeZone);
    }
    else {
        mom = moment.utc(input);
        if (timeZoneOffset != null) {
            mom.utcOffset(timeZoneOffset);
        }
    }
    mom.locale(locale);
    return mom;
}
//# sourceMappingURL=convert.js.map