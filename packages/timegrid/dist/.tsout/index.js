import { createPlugin } from '@fullcalendar/core';
import { DayTimeColsView } from './DayTimeColsView.js';
import { OPTION_REFINERS } from './options-refiners.js';
import './ambient.js';
import './index.css';
export default createPlugin({
    name: '<%= pkgName %>',
    initialView: 'timeGridWeek',
    optionRefiners: OPTION_REFINERS,
    views: {
        timeGrid: {
            component: DayTimeColsView,
            usesMinMaxTime: true,
            allDaySlot: true,
            slotDuration: '00:30:00',
            slotEventOverlap: true, // a bad name. confused with overlap/constraint system
        },
        timeGridDay: {
            type: 'timeGrid',
            duration: { days: 1 },
        },
        timeGridWeek: {
            type: 'timeGrid',
            duration: { weeks: 1 },
        },
    },
});
//# sourceMappingURL=index.js.map