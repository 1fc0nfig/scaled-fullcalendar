import { listenBySelector } from '../util/dom-event.js';
import { EventImpl } from '../api/EventImpl.js';
import { elementClosest } from '../util/dom-manip.js';
import { getElSeg } from '../component/event-rendering.js';
import { Interaction } from './interaction.js';
/*
Detects when the user clicks on an event within a DateComponent
*/
export class EventClicking extends Interaction {
    constructor(settings) {
        super(settings);
        this.handleSegClick = (ev, segEl) => {
            let { component } = this;
            let { context } = component;
            let seg = getElSeg(segEl);
            if (seg && // might be the <div> surrounding the more link
                component.isValidSegDownEl(ev.target)) {
                // our way to simulate a link click for elements that can't be <a> tags
                // grab before trigger fired in case trigger trashes DOM thru rerendering
                let hasUrlContainer = elementClosest(ev.target, '.fc-event-forced-url');
                let url = hasUrlContainer ? hasUrlContainer.querySelector('a[href]').href : '';
                context.emitter.trigger('eventClick', {
                    el: segEl,
                    event: new EventImpl(component.context, seg.eventRange.def, seg.eventRange.instance),
                    jsEvent: ev,
                    view: context.viewApi,
                });
                if (url && !ev.defaultPrevented) {
                    window.location.href = url;
                }
            }
        };
        this.destroy = listenBySelector(settings.el, 'click', '.fc-event', // on both fg and bg events
        this.handleSegClick);
    }
}
//# sourceMappingURL=EventClicking.js.map