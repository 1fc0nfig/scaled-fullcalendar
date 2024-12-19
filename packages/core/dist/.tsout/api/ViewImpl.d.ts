import { DateEnv } from '../datelib/env.js';
import { CalendarData } from '../reducers/data-types.js';
import { CalendarApi } from './CalendarApi.js';
import { ViewApi } from './ViewApi.js';
export declare class ViewImpl implements ViewApi {
    type: string;
    private getCurrentData;
    private dateEnv;
    constructor(type: string, getCurrentData: () => CalendarData, dateEnv: DateEnv);
    get calendar(): CalendarApi;
    get title(): string;
    get activeStart(): Date;
    get activeEnd(): Date;
    get currentStart(): Date;
    get currentEnd(): Date;
    getOption(name: string): any;
}
//# sourceMappingURL=ViewImpl.d.ts.map