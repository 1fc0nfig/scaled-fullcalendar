import { ListViewWrapper } from '../lib/wrappers/ListViewWrapper.js';
describe('list-view event rendering', () => {
    // https://github.com/fullcalendar/fullcalendar/issues/6486
    it('renders events starting yesterday, ending at midnight, as "past"', () => {
        let calendar = initCalendar({
            initialView: 'listMonth',
            initialDate: '2023-04-09',
            now: '2023-04-09',
            events: [{
                    start: '2023-04-08',
                    allDay: true,
                }],
        });
        let wrapper = new ListViewWrapper(calendar);
        let eventEls = wrapper.getEventEls();
        expect(eventEls[0]).toHaveClass('fc-event-past');
    });
});
//# sourceMappingURL=list-events.js.map