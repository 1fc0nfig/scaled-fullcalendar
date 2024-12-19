import { MoreLinkContainer, BaseComponent, } from '@fullcalendar/core/internal';
import { createElement } from '@fullcalendar/core/preact';
import { renderPlainFgSegs } from './TimeCol.js';
export class TimeColMoreLink extends BaseComponent {
    render() {
        let { props } = this;
        return (createElement(MoreLinkContainer, { elClasses: ['fc-timegrid-more-link'], elStyle: {
                top: props.top,
                bottom: props.bottom,
            }, allDayDate: null, moreCnt: props.hiddenSegs.length, allSegs: props.hiddenSegs, hiddenSegs: props.hiddenSegs, extraDateSpan: props.extraDateSpan, dateProfile: props.dateProfile, todayRange: props.todayRange, popoverContent: () => renderPlainFgSegs(props.hiddenSegs, props), defaultGenerator: renderMoreLinkInner, forceTimed: true }, (InnerContent) => (createElement(InnerContent, { elTag: "div", elClasses: ['fc-timegrid-more-link-inner', 'fc-sticky'] }))));
    }
}
function renderMoreLinkInner(props) {
    return props.shortText;
}
//# sourceMappingURL=TimeColMoreLink.js.map