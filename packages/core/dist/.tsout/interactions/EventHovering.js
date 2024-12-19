import { listenToHoverBySelector } from '../util/dom-event.js';
import { EventImpl } from '../api/EventImpl.js';
import { getElSeg } from '../component/event-rendering.js';
import { Interaction } from './interaction.js';
/*
Triggers events and adds/removes core classNames when the user's pointer
enters/leaves event-elements of a component.
*/
export class EventHovering extends Interaction {
    constructor(settings) {
        super(settings);
        // for simulating an eventMouseLeave when the event el is destroyed while mouse is over it
        this.handleEventElRemove = (el) => {
            if (el === this.currentSegEl) {
                this.handleSegLeave(null, this.currentSegEl);
            }
        };
        this.handleSegEnter = (ev, segEl) => {
            if (getElSeg(segEl)) { // TODO: better way to make sure not hovering over more+ link or its wrapper
                this.currentSegEl = segEl;
                this.triggerEvent('eventMouseEnter', ev, segEl);
            }
        };
        this.handleSegLeave = (ev, segEl) => {
            if (this.currentSegEl) {
                this.currentSegEl = null;
                this.triggerEvent('eventMouseLeave', ev, segEl);
            }
        };
        this.removeHoverListeners = listenToHoverBySelector(settings.el, '.fc-event', // on both fg and bg events
        this.handleSegEnter, this.handleSegLeave);
    }
    destroy() {
        this.removeHoverListeners();
    }
    triggerEvent(publicEvName, ev, segEl) {
        let { component } = this;
        let { context } = component;
        let seg = getElSeg(segEl);
        if (!ev || component.isValidSegDownEl(ev.target)) {
            context.emitter.trigger(publicEvName, {
                el: segEl,
                event: new EventImpl(context, seg.eventRange.def, seg.eventRange.instance),
                jsEvent: ev,
                view: context.viewApi,
            });
        }
    }
}
//# sourceMappingURL=EventHovering.js.map