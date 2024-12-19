import { identity, createFormatter, } from '@fullcalendar/core/internal';
export const OPTION_REFINERS = {
    listDayFormat: createFalsableFormatter,
    listDaySideFormat: createFalsableFormatter,
    noEventsClassNames: identity,
    noEventsContent: identity,
    noEventsDidMount: identity,
    noEventsWillUnmount: identity,
    // noEventsText is defined in base options
};
function createFalsableFormatter(input) {
    return input === false ? null : createFormatter(input);
}
//# sourceMappingURL=option-refiners.js.map