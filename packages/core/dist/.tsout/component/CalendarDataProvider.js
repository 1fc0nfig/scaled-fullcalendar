import { Component } from '../preact.js';
import { CalendarDataManager } from '../reducers/CalendarDataManager.js';
// TODO: move this to react plugin?
export class CalendarDataProvider extends Component {
    constructor(props) {
        super(props);
        this.handleData = (data) => {
            if (!this.dataManager) { // still within initial run, before assignment in constructor
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state = data; // can't use setState yet
            }
            else {
                this.setState(data);
            }
        };
        this.dataManager = new CalendarDataManager({
            optionOverrides: props.optionOverrides,
            calendarApi: props.calendarApi,
            onData: this.handleData,
        });
    }
    render() {
        return this.props.children(this.state);
    }
    componentDidUpdate(prevProps) {
        let newOptionOverrides = this.props.optionOverrides;
        if (newOptionOverrides !== prevProps.optionOverrides) { // prevent recursive handleData
            this.dataManager.resetOptions(newOptionOverrides);
        }
    }
}
//# sourceMappingURL=CalendarDataProvider.js.map