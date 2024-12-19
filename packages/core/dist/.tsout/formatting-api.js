import { DateEnv } from './datelib/env.js';
import { createFormatter } from './datelib/formatting.js';
import { organizeRawLocales, buildLocale } from './datelib/locale.js';
import { BASE_OPTION_DEFAULTS } from './options.js';
export function formatDate(dateInput, options = {}) {
    let dateEnv = buildDateEnv(options);
    let formatter = createFormatter(options);
    let dateMeta = dateEnv.createMarkerMeta(dateInput);
    if (!dateMeta) { // TODO: warning?
        return '';
    }
    return dateEnv.format(dateMeta.marker, formatter, {
        forcedTzo: dateMeta.forcedTzo,
    });
}
export function formatRange(startInput, endInput, options) {
    let dateEnv = buildDateEnv(typeof options === 'object' && options ? options : {}); // pass in if non-null object
    let formatter = createFormatter(options);
    let startMeta = dateEnv.createMarkerMeta(startInput);
    let endMeta = dateEnv.createMarkerMeta(endInput);
    if (!startMeta || !endMeta) { // TODO: warning?
        return '';
    }
    return dateEnv.formatRange(startMeta.marker, endMeta.marker, formatter, {
        forcedStartTzo: startMeta.forcedTzo,
        forcedEndTzo: endMeta.forcedTzo,
        isEndExclusive: options.isEndExclusive,
        defaultSeparator: BASE_OPTION_DEFAULTS.defaultRangeSeparator,
    });
}
// TODO: more DRY and optimized
function buildDateEnv(settings) {
    let locale = buildLocale(settings.locale || 'en', organizeRawLocales([]).map); // TODO: don't hardcode 'en' everywhere
    return new DateEnv(Object.assign(Object.assign({ timeZone: BASE_OPTION_DEFAULTS.timeZone, calendarSystem: 'gregory' }, settings), { locale }));
}
//# sourceMappingURL=formatting-api.js.map