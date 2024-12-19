import { Component, ComponentChildren } from '../preact.js';
import { CalendarDataManager } from '../reducers/CalendarDataManager.js';
import { CalendarImpl } from '../api/CalendarImpl.js';
import { CalendarData } from '../reducers/data-types.js';
export interface CalendarDataProviderProps {
    optionOverrides: any;
    calendarApi: CalendarImpl;
    children?: (data: CalendarData) => ComponentChildren;
}
export declare class CalendarDataProvider extends Component<CalendarDataProviderProps, CalendarData> {
    dataManager: CalendarDataManager;
    constructor(props: CalendarDataProviderProps);
    handleData: (data: CalendarData) => void;
    render(): ComponentChildren;
    componentDidUpdate(prevProps: CalendarDataProviderProps): void;
}
//# sourceMappingURL=CalendarDataProvider.d.ts.map