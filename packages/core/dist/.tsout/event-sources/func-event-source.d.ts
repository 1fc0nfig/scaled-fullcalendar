import { EventInput } from '../structs/event-parse.js';
export type EventSourceFuncArg = {
    start: Date;
    end: Date;
    startStr: string;
    endStr: string;
    timeZone: string;
};
export type EventSourceFunc = ((arg: EventSourceFuncArg, successCallback: (eventInputs: EventInput[]) => void, failureCallback: (error: Error) => void) => void) | ((arg: EventSourceFuncArg) => Promise<EventInput[]>);
export declare const funcEventSourcePlugin: import("../plugin-system-struct.js").PluginDef;
//# sourceMappingURL=func-event-source.d.ts.map