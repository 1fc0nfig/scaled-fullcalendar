import { Options as RRuleOptions } from 'rrule';
import { DateInput } from '@fullcalendar/core';
import { createDuration, Identity } from '@fullcalendar/core/internal';
export type RRuleInputObjectFull = Omit<RRuleOptions, 'dtstart' | 'until' | 'freq' | 'wkst' | 'byweekday'> & {
    dtstart: RRuleOptions['dtstart'] | DateInput;
    until: RRuleOptions['until'] | DateInput;
    freq: RRuleOptions['freq'] | string;
    wkst: RRuleOptions['wkst'] | string;
    byweekday: RRuleOptions['byweekday'] | string | string[];
};
export type RRuleInputObject = Partial<RRuleInputObjectFull>;
export type RRuleInput = RRuleInputObject | string;
export declare const RRULE_EVENT_REFINERS: {
    rrule: Identity<RRuleInput>;
    exrule: Identity<Partial<RRuleInputObjectFull> | Partial<RRuleInputObjectFull>[]>;
    exdate: Identity<DateInput | DateInput[]>;
    duration: typeof createDuration;
};
//# sourceMappingURL=event-refiners.d.ts.map