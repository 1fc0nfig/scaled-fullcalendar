import { ClassNamesGenerator, FormatterInput } from '@fullcalendar/core';
import { Identity, CustomContentGenerator, DidMountHandler, WillUnmountHandler, DateFormatter } from '@fullcalendar/core/internal';
import { NoEventsContentArg, NoEventsMountArg } from './public-types.js';
export declare const OPTION_REFINERS: {
    listDayFormat: typeof createFalsableFormatter;
    listDaySideFormat: typeof createFalsableFormatter;
    noEventsClassNames: Identity<ClassNamesGenerator<NoEventsContentArg>>;
    noEventsContent: Identity<CustomContentGenerator<NoEventsContentArg>>;
    noEventsDidMount: Identity<DidMountHandler<NoEventsMountArg>>;
    noEventsWillUnmount: Identity<WillUnmountHandler<NoEventsMountArg>>;
};
declare function createFalsableFormatter(input: FormatterInput | false): DateFormatter;
export {};
//# sourceMappingURL=option-refiners.d.ts.map