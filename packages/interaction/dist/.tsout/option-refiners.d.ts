import { EventDropArg } from '@fullcalendar/core';
import { Identity } from '@fullcalendar/core/internal';
import { DateClickArg, EventDragStartArg, EventDragStopArg, EventResizeStartArg, EventResizeStopArg, EventResizeDoneArg, DropArg, EventReceiveArg, EventLeaveArg } from './public-types.js';
export declare const OPTION_REFINERS: {
    fixedMirrorParent: Identity<HTMLElement>;
};
export declare const LISTENER_REFINERS: {
    dateClick: Identity<(arg: DateClickArg) => void>;
    eventDragStart: Identity<(arg: EventDragStartArg) => void>;
    eventDragStop: Identity<(arg: EventDragStopArg) => void>;
    eventDrop: Identity<(arg: EventDropArg) => void>;
    eventResizeStart: Identity<(arg: EventResizeStartArg) => void>;
    eventResizeStop: Identity<(arg: EventResizeStopArg) => void>;
    eventResize: Identity<(arg: EventResizeDoneArg) => void>;
    drop: Identity<(arg: DropArg) => void>;
    eventReceive: Identity<(arg: EventReceiveArg) => void>;
    eventLeave: Identity<(arg: EventLeaveArg) => void>;
};
//# sourceMappingURL=option-refiners.d.ts.map