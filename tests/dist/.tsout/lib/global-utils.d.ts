/// <reference types="jasmine" />
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import './hacks.js';
import './simulate.js';
import './date-matchers.js';
declare function pushOptions(options: CalendarOptions): void;
declare function spyOnCalendarCallback(name: any, func?: any): any;
declare function initCalendar(moreOptions?: CalendarOptions, el?: any): Calendar;
declare function getCurrentOptions(): any;
declare function describeOptions(optName: any, hash?: any, callback?: any): void;
declare function describeValues(hash: any, callback: any): void;
declare function describeTimeZones(callback: any): void;
declare function describeTimeZone(name: any, callback: any): void;
declare function oneCall(func: any): () => any;
declare function spyOnMethod(Class: any, methodName: any, dontCallThrough: any): jasmine.Spy<any>;
declare function spyCall(func?: any): any;
type spyOnCalendarCallbackType = typeof spyOnCalendarCallback;
type pushOptionsType = typeof pushOptions;
type initCalendarType = typeof initCalendar;
type getCurrentOptionsType = typeof getCurrentOptions;
type describeOptionsType = typeof describeOptions;
type describeValuesType = typeof describeValues;
type describeTimeZonesType = typeof describeTimeZones;
type describeTimeZoneType = typeof describeTimeZone;
type oneCallType = typeof oneCall;
type spyOnMethodType = typeof spyOnMethod;
type spyCallType = typeof spyCall;
declare global {
    let currentCalendar: Calendar;
    let spyOnCalendarCallback: spyOnCalendarCallbackType;
    let pushOptions: pushOptionsType;
    let initCalendar: initCalendarType;
    let getCurrentOptions: getCurrentOptionsType;
    let describeOptions: describeOptionsType;
    let describeValues: describeValuesType;
    let describeTimeZones: describeTimeZonesType;
    let describeTimeZone: describeTimeZoneType;
    let oneCall: oneCallType;
    let spyOnMethod: spyOnMethodType;
    let spyCall: spyCallType;
    interface Window {
        currentCalendar: Calendar;
        karmaConfig: any;
    }
    interface Function {
        calls: any;
    }
    interface JQueryStatic {
        simulate: any;
        simulateMouseClick: any;
        simulateTouchClick: any;
        simulateByPoint: any;
        _data: any;
    }
    interface JQuery {
        simulate: any;
        draggable: any;
        sortable: any;
    }
    namespace jasmine {
        interface Matchers<T> {
            toEqualDate: any;
            toEqualLocalDate: any;
            toEqualNow: any;
            toBeBoundedBy: any;
            toIntersectWith: any;
            toBeAbove: any;
            toBeBelow: any;
            toBeRightOf: any;
            toBeLeftOf: any;
            toHaveScrollbars: any;
            toBeMostlyHBoundedBy: any;
            toBeMostlyAbove: any;
            toBeMostlyLeftOf: any;
            toBeMostlyRightOf: any;
        }
    }
}
export {};
//# sourceMappingURL=global-utils.d.ts.map