import { BASE_OPTION_DEFAULTS } from '@fullcalendar/core/internal';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging.js';
import { ExternalElementDragging } from './ExternalElementDragging.js';
/*
Makes an element (that is *external* to any calendar) draggable.
Can pass in data that determines how an event will be created when dropped onto a calendar.
Leverages FullCalendar's internal drag-n-drop functionality WITHOUT a third-party drag system.
*/
export class ExternalDraggable {
    constructor(el, settings = {}) {
        this.handlePointerDown = (ev) => {
            let { dragging } = this;
            let { minDistance, longPressDelay } = this.settings;
            dragging.minDistance =
                minDistance != null ?
                    minDistance :
                    (ev.isTouch ? 0 : BASE_OPTION_DEFAULTS.eventDragMinDistance);
            dragging.delay =
                ev.isTouch ? // TODO: eventually read eventLongPressDelay instead vvv
                    (longPressDelay != null ? longPressDelay : BASE_OPTION_DEFAULTS.longPressDelay) :
                    0;
        };
        this.handleDragStart = (ev) => {
            if (ev.isTouch &&
                this.dragging.delay &&
                ev.subjectEl.classList.contains('fc-event')) {
                this.dragging.mirror.getMirrorEl().classList.add('fc-event-selected');
            }
        };
        this.settings = settings;
        let dragging = this.dragging = new FeaturefulElementDragging(el);
        dragging.touchScrollAllowed = false;
        if (settings.itemSelector != null) {
            dragging.pointer.selector = settings.itemSelector;
        }
        if (settings.appendTo != null) {
            dragging.mirror.parentNode = settings.appendTo; // TODO: write tests
        }
        dragging.emitter.on('pointerdown', this.handlePointerDown);
        dragging.emitter.on('dragstart', this.handleDragStart);
        new ExternalElementDragging(dragging, settings.eventData); // eslint-disable-line no-new
    }
    destroy() {
        this.dragging.destroy();
    }
}
//# sourceMappingURL=ExternalDraggable.js.map