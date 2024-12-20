import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper.js';
describe('defaultAllDayEventDuration', () => {
    pushOptions({
        initialDate: '2014-05-01',
        initialView: 'dayGridMonth',
        timeZone: 'UTC',
    });
    describe('when forceEventDuration is on', () => {
        pushOptions({
            forceEventDuration: true,
        });
        it('correctly calculates an unspecified end when using a Duration object input', () => {
            initCalendar({
                defaultAllDayEventDuration: { days: 2 },
                events: [
                    {
                        allDay: true,
                        start: '2014-05-05',
                    },
                ],
            });
            let event = currentCalendar.getEvents()[0];
            expect(event.end).toEqualDate('2014-05-07');
        });
        it('correctly calculates an unspecified end when using a string Duration input', () => {
            initCalendar({
                defaultAllDayEventDuration: '3.00:00:00',
                events: [
                    {
                        allDay: true,
                        start: '2014-05-05',
                    },
                ],
            });
            let event = currentCalendar.getEvents()[0];
            expect(event.end).toEqualDate('2014-05-08');
        });
    });
    describe('when forceEventDuration is off', () => {
        pushOptions({
            forceEventDuration: false,
        });
        describeOptions('initialView', {
            'with dayGridWeek view': 'dayGridWeek',
            'with week view': 'timeGridWeek',
        }, () => {
            it('renders an all-day event with no `end` to appear to have the default duration', () => {
                let calendar = initCalendar({
                    defaultAllDayEventDuration: { days: 2 },
                    events: [
                        {
                            // a control. so we know how wide it should be
                            title: 'control event',
                            allDay: true,
                            start: '2014-04-28',
                            end: '2014-04-30',
                        },
                        {
                            // one day after the control. no specified end
                            title: 'test event',
                            allDay: true,
                            start: '2014-04-28',
                        },
                    ],
                });
                let calendarWrapper = new CalendarWrapper(calendar);
                let eventElms = calendarWrapper.getEventEls();
                let width0 = eventElms[0].offsetWidth;
                let width1 = eventElms[1].offsetWidth;
                expect(width0).toBeGreaterThan(0);
                expect(width0).toEqual(width1);
            });
        });
    });
});
//# sourceMappingURL=defaultAllDayEventDuration.js.map