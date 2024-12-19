import { arrayToUtcDate, dateToUtcArray } from './marker.js';
let calendarSystemClassMap = {};
export function registerCalendarSystem(name, theClass) {
    calendarSystemClassMap[name] = theClass;
}
export function createCalendarSystem(name) {
    return new calendarSystemClassMap[name]();
}
class GregorianCalendarSystem {
    getMarkerYear(d) {
        return d.getUTCFullYear();
    }
    getMarkerMonth(d) {
        return d.getUTCMonth();
    }
    getMarkerDay(d) {
        return d.getUTCDate();
    }
    arrayToMarker(arr) {
        return arrayToUtcDate(arr);
    }
    markerToArray(marker) {
        return dateToUtcArray(marker);
    }
}
registerCalendarSystem('gregory', GregorianCalendarSystem);
//# sourceMappingURL=calendar-system.js.map