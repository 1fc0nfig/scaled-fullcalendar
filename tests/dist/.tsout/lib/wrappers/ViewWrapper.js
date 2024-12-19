export class ViewWrapper {
    constructor(calendar, className) {
        let viewEl = calendar.el.querySelector('.fc-view');
        if (!viewEl || !viewEl.classList.contains(className)) {
            throw new Error(`Can't find view with className '${className}' in test model`);
        }
        this.el = viewEl;
    }
}
//# sourceMappingURL=ViewWrapper.js.map