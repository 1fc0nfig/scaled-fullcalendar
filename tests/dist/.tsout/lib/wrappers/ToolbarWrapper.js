export class ToolbarWrapper {
    constructor(el) {
        this.el = el;
    }
    getButtonEnabled(name) {
        let buttonEl = this.el.querySelector('.fc-' + name + '-button');
        return buttonEl && !buttonEl.disabled;
    }
    getButtonInfo(name, iconPrefix = 'fc-icon') {
        let el = this.getButtonEl(name);
        if (el) {
            let iconEl = el.querySelector(`.${iconPrefix}`);
            let iconNameMatch = iconEl && iconEl.className.match(new RegExp(`${iconPrefix}-([^ ]+)`));
            return {
                text: $(el).text(),
                iconEl,
                iconName: iconNameMatch ? iconNameMatch[1] : '',
            };
        }
        return null;
    }
    getButtonEl(name) {
        return this.el.querySelector(`.fc-${name}-button`);
    }
    getTitleText() {
        return this.el.querySelector('.fc-toolbar-title').innerText.trim();
    }
    getSectionContent(index) {
        return processSectionItems(this.el.querySelectorAll('.fc-toolbar-chunk')[index]);
    }
}
function processSectionItems(sectionEl) {
    let children = Array.prototype.slice.call(sectionEl.children);
    return children.map((childEl) => {
        if (childEl.classList.contains('fc-button')) {
            return {
                type: 'button',
                name: childEl.className.match(/fc-(\w+)-button/)[1],
            };
        }
        if (childEl.classList.contains('fc-button-group')) {
            return {
                type: 'button-group',
                children: processSectionItems(childEl),
            };
        }
        if (childEl.nodeName === 'H2') {
            return {
                type: 'title',
            };
        }
        throw new Error('Unknown type of content in toolbar');
    });
}
//# sourceMappingURL=ToolbarWrapper.js.map