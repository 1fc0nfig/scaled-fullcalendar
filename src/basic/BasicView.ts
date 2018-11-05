import { htmlEscape } from '../util/html'
import { createElement, findElements } from '../util/dom-manip'
import {
  matchCellWidths,
  uncompensateScroll,
  compensateScroll,
  subtractInnerElHeight,
  distributeHeight,
  undistributeHeight
} from '../util/misc'
import { createFormatter } from '../datelib/formatting'
import ScrollComponent from '../common/ScrollComponent'
import View from '../View'
import BasicViewDateProfileGenerator from './BasicViewDateProfileGenerator'
import DayGrid from './DayGrid'
import { buildGotoAnchorHtml } from '../component/date-rendering'
import { StandardDateComponentProps } from '../component/StandardDateComponent'
import { assignTo } from '../util/object'
import { ComponentContext } from '../component/Component'
import { ViewSpec } from '../structs/view-spec'
import DateProfileGenerator, { DateProfile } from '../DateProfileGenerator'
import reselector from '../util/reselector'
import DayTableHeader from './DayTableHeader'
import DayGridSlicer from './DayGridSlicer'

const WEEK_NUM_FORMAT = createFormatter({ week: 'numeric' })


/* An abstract class for the "basic" views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.

export default class BasicView extends View {

  scroller: ScrollComponent
  header: DayTableHeader
  dayGrid: DayGrid // the main subcomponent that does most of the heavy lifting
  colWeekNumbersVisible: boolean


  constructor(context: ComponentContext, viewSpec: ViewSpec, dateProfileGenerator: DateProfileGenerator, parentEl: HTMLElement) {
    super(context, viewSpec, dateProfileGenerator, parentEl)

    this.el.classList.add('fc-basic-view')
    this.el.innerHTML = this.renderSkeletonHtml()

    this.scroller = new ScrollComponent(
      'hidden', // overflow x
      'auto' // overflow y
    )

    let dayGridContainerEl = this.scroller.el
    this.el.querySelector('.fc-body > tr > td').appendChild(dayGridContainerEl)
    dayGridContainerEl.classList.add('fc-day-grid-container')
    let dayGridEl = createElement('div', { className: 'fc-day-grid' })
    dayGridContainerEl.appendChild(dayGridEl)

    let cellWeekNumbersVisible

    if (this.opt('weekNumbers')) {
      if (this.opt('weekNumbersWithinDays')) {
        cellWeekNumbersVisible = true
        this.colWeekNumbersVisible = false
      } else {
        cellWeekNumbersVisible = false
        this.colWeekNumbersVisible = true
      }
    } else {
      this.colWeekNumbersVisible = false
      cellWeekNumbersVisible = false
    }

    if (this.opt('columnHeader')) {
      this.header = new DayTableHeader(
        this.context,
        this.el.querySelector('.fc-head-container')
      )
    }

    this.dayGrid = new DayGrid(
      this.context,
      dayGridEl,
      {
        renderNumberIntroHtml: this.renderDayGridNumberIntroHtml,
        renderBgIntroHtml: this.renderDayGridBgIntroHtml,
        renderIntroHtml: this.renderDayGridIntroHtml,
        colWeekNumbersVisible: this.colWeekNumbersVisible,
        cellWeekNumbersVisible
      }
    )
    this.dayGrid.isRigid = this.hasRigidRows()
  }


  destroy() {
    super.destroy()

    if (this.header) {
      this.header.destroy()
    }

    this.dayGrid.destroy()
    this.scroller.destroy()
  }


  render(props: StandardDateComponentProps) {
    super.render(props)

    let slicer = this.buildSlicer(props.dateProfile)

    if (this.header) {
      this.header.receiveProps({
        dateProfile: props.dateProfile,
        dates: this.sliceDayDates(slicer), // get just the first row
        datesRepDistinctDays: slicer.rowCnt === 1,
        renderIntroHtml: this.renderHeadIntroHtml
      })
    }

    this.dayGrid.receiveProps(
      assignTo({}, props, {
        slicer
      })
    )
  }


  buildSlicer = reselector(function(this: BasicView, dateProfile: DateProfile) {
    return new DayGridSlicer(
      dateProfile,
      this.dateProfileGenerator,
      this.isRtl,
      /year|month|week/.test(dateProfile.currentRangeUnit)
    )
  })


  sliceDayDates = reselector(function(slicer: DayGridSlicer) { // TODO: put into slicer
    return slicer.daySeries.dates.slice(0, slicer.colCnt)
  })


  // Builds the HTML skeleton for the view.
  // The day-grid component will render inside of a container defined by this HTML.
  renderSkeletonHtml() {
    let { theme } = this

    return '' +
      '<table class="' + theme.getClass('tableGrid') + '">' +
        (this.opt('columnHeader') ?
          '<thead class="fc-head">' +
            '<tr>' +
              '<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
            '</tr>' +
          '</thead>' :
          ''
          ) +
        '<tbody class="fc-body">' +
          '<tr>' +
            '<td class="' + theme.getClass('widgetContent') + '"></td>' +
          '</tr>' +
        '</tbody>' +
      '</table>'
  }


  // Determines whether each row should have a constant height
  hasRigidRows() {
    let eventLimit = this.opt('eventLimit')

    return eventLimit && typeof eventLimit !== 'number'
  }


  /* Dimensions
  ------------------------------------------------------------------------------------------------------------------*/


  updateSize(viewHeight: number, isAuto: boolean, isResize: boolean) {
    super.updateSize(viewHeight, isAuto, isResize) // will call updateBaseSize. important that executes first

    this.dayGrid.updateSize(viewHeight, isAuto, isResize)
  }


  // Refreshes the horizontal dimensions of the view
  updateBaseSize(viewHeight: number, isAuto: boolean, isResize: boolean) {
    let { header, dayGrid } = this
    let eventLimit = this.opt('eventLimit')
    let headRowEl = header ? header.el : null
    let scrollerHeight
    let scrollbarWidths

    // hack to give the view some height prior to dayGrid's columns being rendered
    // TODO: separate setting height from scroller VS dayGrid.
    if (!dayGrid.rowEls) {
      if (!isAuto) {
        scrollerHeight = this.computeScrollerHeight(viewHeight)
        this.scroller.setHeight(scrollerHeight)
      }
      return
    }

    if (this.colWeekNumbersVisible) {
      // Make sure all week number cells running down the side have the same width.
      matchCellWidths(findElements(this.el, '.fc-week-number'))
    }

    // reset all heights to be natural
    this.scroller.clear()
    if (headRowEl) {
      uncompensateScroll(headRowEl)
    }

    dayGrid.removeSegPopover() // kill the "more" popover if displayed

    // is the event limit a constant level number?
    if (eventLimit && typeof eventLimit === 'number') {
      dayGrid.limitRows(eventLimit) // limit the levels first so the height can redistribute after
    }

    // distribute the height to the rows
    // (viewHeight is a "recommended" value if isAuto)
    scrollerHeight = this.computeScrollerHeight(viewHeight)
    this.setGridHeight(scrollerHeight, isAuto)

    // is the event limit dynamically calculated?
    if (eventLimit && typeof eventLimit !== 'number') {
      dayGrid.limitRows(eventLimit) // limit the levels after the grid's row heights have been set
    }

    if (!isAuto) { // should we force dimensions of the scroll container?

      this.scroller.setHeight(scrollerHeight)
      scrollbarWidths = this.scroller.getScrollbarWidths()

      if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?

        if (headRowEl) {
          compensateScroll(headRowEl, scrollbarWidths)
        }

        // doing the scrollbar compensation might have created text overflow which created more height. redo
        scrollerHeight = this.computeScrollerHeight(viewHeight)
        this.scroller.setHeight(scrollerHeight)
      }

      // guarantees the same scrollbar widths
      this.scroller.lockOverflow(scrollbarWidths)
    }
  }


  // given a desired total height of the view, returns what the height of the scroller should be
  computeScrollerHeight(viewHeight) {
    return viewHeight -
      subtractInnerElHeight(this.el, this.scroller.el) // everything that's NOT the scroller
  }


  // Sets the height of just the DayGrid component in this view
  setGridHeight(height, isAuto) {
    if (isAuto) {
      undistributeHeight(this.dayGrid.rowEls) // let the rows be their natural height with no expanding
    } else {
      distributeHeight(this.dayGrid.rowEls, height, true) // true = compensate for height-hogging rows
    }
  }


  /* Scroll
  ------------------------------------------------------------------------------------------------------------------*/


  computeInitialDateScroll() {
    return { top: 0 }
  }


  queryDateScroll() {
    return { top: this.scroller.getScrollTop() }
  }


  applyDateScroll(scroll) {
    if (scroll.top !== undefined) {
      this.scroller.setScrollTop(scroll.top)
    }
  }


  /* Header Rendering
  ------------------------------------------------------------------------------------------------------------------*/


  // Generates the HTML that will go before the day-of week header cells
  renderHeadIntroHtml = () => {
    let { theme } = this

    if (this.colWeekNumbersVisible) {
      return '' +
        '<th class="fc-week-number ' + theme.getClass('widgetHeader') + '">' +
          '<span>' + // needed for matchCellWidths
            htmlEscape(this.opt('weekLabel')) +
          '</span>' +
        '</th>'
    }

    return ''
  }


  /* Day Grid Rendering
  ------------------------------------------------------------------------------------------------------------------*/


  // Generates the HTML that will go before content-skeleton cells that display the day/week numbers
  renderDayGridNumberIntroHtml = (row) => {
    let { dateEnv } = this
    let slicer = (this.dayGrid.props as any).slicer as DayGridSlicer
    let weekStart = slicer.getCellDate(row, 0)

    if (this.colWeekNumbersVisible) {
      return '' +
        '<td class="fc-week-number">' +
          buildGotoAnchorHtml( // aside from link, important for matchCellWidths
            this,
            { date: weekStart, type: 'week', forceOff: slicer.daySeries.dates.length === 1 },
            dateEnv.format(weekStart, WEEK_NUM_FORMAT) // inner HTML
          ) +
        '</td>'
    }

    return ''
  }


  // Generates the HTML that goes before the day bg cells for each day-row
  renderDayGridBgIntroHtml = () => {
    let { theme } = this

    if (this.colWeekNumbersVisible) {
      return '<td class="fc-week-number ' + theme.getClass('widgetContent') + '"></td>'
    }

    return ''
  }


  // Generates the HTML that goes before every other type of row generated by DayGrid.
  // Affects mirror-skeleton and highlight-skeleton rows.
  renderDayGridIntroHtml = () => {

    if (this.colWeekNumbersVisible) {
      return '<td class="fc-week-number"></td>'
    }

    return ''
  }

}

BasicView.prototype.dateProfileGeneratorClass = BasicViewDateProfileGenerator

