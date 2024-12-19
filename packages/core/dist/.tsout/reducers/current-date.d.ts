import { DateEnv, DateInput } from '../datelib/env.js';
import { DateMarker } from '../datelib/marker.js';
import { Action } from './Action.js';
import { BaseOptionsRefined } from '../options.js';
export declare function reduceCurrentDate(currentDate: DateMarker, action: Action): Date;
export declare function getInitialDate(options: BaseOptionsRefined, dateEnv: DateEnv): Date;
export declare function getNow(nowInput: DateInput | (() => DateInput), dateEnv: DateEnv): Date;
//# sourceMappingURL=current-date.d.ts.map