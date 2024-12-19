export function waitEventDrag(calendar, dragging) {
    return new Promise((resolve) => {
        let modifiedEvent = false;
        calendar.on('eventDrop', (arg) => {
            modifiedEvent = arg.event;
        });
        calendar.on('_noEventDrop', () => {
            resolve(false);
        });
        dragging.then(() => {
            setTimeout(() => {
                resolve(modifiedEvent);
            });
        });
    });
}
export function waitEventDrag2(calendar, dragging) {
    return new Promise((resolve) => {
        let theArg = false;
        calendar.on('eventDrop', (arg) => {
            theArg = arg;
        });
        calendar.on('_noEventDrop', () => {
            resolve(false);
        });
        dragging.then(() => {
            setTimeout(() => {
                resolve(theArg);
            });
        });
    });
}
export function waitEventResize(calendar, dragging) {
    return new Promise((resolve) => {
        let modifiedEvent = false;
        calendar.on('eventResize', (arg) => {
            modifiedEvent = arg.event;
        });
        dragging.then(() => {
            setTimeout(() => {
                resolve(modifiedEvent);
            });
        });
    });
}
export function waitEventResize2(calendar, dragging) {
    return new Promise((resolve) => {
        let theArg = false;
        calendar.on('eventResize', (arg) => {
            theArg = arg;
        });
        dragging.then(() => {
            setTimeout(() => {
                resolve(theArg);
            });
        });
    });
}
export function waitDateSelect(calendar, dragging) {
    return new Promise((resolve) => {
        let selectInfo = null;
        calendar.on('select', (arg) => {
            selectInfo = arg;
        });
        dragging.then(() => {
            setTimeout(() => {
                resolve(selectInfo);
            });
        });
    });
}
export function waitDateClick(calendar, dragging) {
    return new Promise((resolve) => {
        let dateClickArg = null;
        calendar.on('dateClick', (arg) => {
            dateClickArg = arg;
        });
        dragging.then(() => {
            setTimeout(() => {
                resolve(dateClickArg);
            });
        });
    });
}
//# sourceMappingURL=interaction-util.js.map