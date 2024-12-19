import { EventSourceDef, Dictionary } from '@fullcalendar/core/internal';
interface GCalMeta {
    googleCalendarId: string;
    googleCalendarApiKey?: string;
    googleCalendarApiBase?: string;
    extraParams?: Dictionary | (() => Dictionary);
}
export declare const eventSourceDef: EventSourceDef<GCalMeta>;
export {};
//# sourceMappingURL=event-source-def.d.ts.map