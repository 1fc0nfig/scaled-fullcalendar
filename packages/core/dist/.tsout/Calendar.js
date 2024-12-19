import { DelayedRunner } from './util/DelayedRunner.js';
import { CalendarDataManager } from './reducers/CalendarDataManager.js';
import { CalendarRoot } from './CalendarRoot.js';
import { CalendarContent } from './CalendarContent.js';
import { createElement, render, flushSync } from './preact.js';
import { isArraysEqual } from './util/array.js';
import { applyStyleProp } from './util/dom-manip.js';
import { RenderId } from './content-inject/RenderId.js';
import { CalendarImpl } from './api/CalendarImpl.js';
import { ensureElHasStyles } from './styleUtils.js';
export class Calendar extends CalendarImpl {
    constructor(el, optionOverrides = {}) {
        super();
        this.isRendering = false;
        this.isRendered = false;
        this.currentClassNames = [];
        this.customContentRenderId = 0;
        this.handleAction = (action) => {
            // actions we know we want to render immediately
            switch (action.type) {
                case 'SET_EVENT_DRAG':
                case 'SET_EVENT_RESIZE':
                    this.renderRunner.tryDrain();
            }
        };
        this.handleData = (data) => {
            this.currentData = data;
            this.renderRunner.request(data.calendarOptions.rerenderDelay);
        };
        this.handleRenderRequest = () => {
            if (this.isRendering) {
                this.isRendered = true;
                let { currentData } = this;
                flushSync(() => {
                    render(createElement(CalendarRoot, { options: currentData.calendarOptions, theme: currentData.theme, emitter: currentData.emitter }, (classNames, height, isHeightAuto, forPrint) => {
                        this.setClassNames(classNames);
                        this.setHeight(height);
                        return (createElement(RenderId.Provider, { value: this.customContentRenderId },
                            createElement(CalendarContent, Object.assign({ isHeightAuto: isHeightAuto, forPrint: forPrint }, currentData))));
                    }), this.el);
                });
            }
            else if (this.isRendered) {
                this.isRendered = false;
                render(null, this.el);
                this.setClassNames([]);
                this.setHeight('');
            }
        };
        ensureElHasStyles(el);
        this.el = el;
        this.renderRunner = new DelayedRunner(this.handleRenderRequest);
        new CalendarDataManager({
            optionOverrides,
            calendarApi: this,
            onAction: this.handleAction,
            onData: this.handleData,
        });
    }
    render() {
        let wasRendering = this.isRendering;
        if (!wasRendering) {
            this.isRendering = true;
        }
        else {
            this.customContentRenderId += 1;
        }
        this.renderRunner.request();
        if (wasRendering) {
            this.updateSize();
        }
    }
    destroy() {
        if (this.isRendering) {
            this.isRendering = false;
            this.renderRunner.request();
        }
    }
    updateSize() {
        flushSync(() => {
            super.updateSize();
        });
    }
    batchRendering(func) {
        this.renderRunner.pause('batchRendering');
        func();
        this.renderRunner.resume('batchRendering');
    }
    pauseRendering() {
        this.renderRunner.pause('pauseRendering');
    }
    resumeRendering() {
        this.renderRunner.resume('pauseRendering', true);
    }
    resetOptions(optionOverrides, changedOptionNames) {
        this.currentDataManager.resetOptions(optionOverrides, changedOptionNames);
    }
    setClassNames(classNames) {
        if (!isArraysEqual(classNames, this.currentClassNames)) {
            let { classList } = this.el;
            for (let className of this.currentClassNames) {
                classList.remove(className);
            }
            for (let className of classNames) {
                classList.add(className);
            }
            this.currentClassNames = classNames;
        }
    }
    setHeight(height) {
        applyStyleProp(this.el, 'height', height);
    }
}
//# sourceMappingURL=Calendar.js.map