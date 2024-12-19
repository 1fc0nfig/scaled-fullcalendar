import { Component, Ref } from './preact.js';
import { ViewContext } from './ViewContext.js';
import { EqualityFuncs } from './util/object.js';
import { Dictionary } from './options.js';
export declare abstract class PureComponent<Props = Dictionary, State = Dictionary> extends Component<Props, State> {
    static addPropsEquality: typeof addPropsEquality;
    static addStateEquality: typeof addStateEquality;
    static contextType: any;
    context: ViewContext;
    propEquality: EqualityFuncs<Props>;
    stateEquality: EqualityFuncs<State>;
    debug: boolean;
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    safeSetState(newState: Partial<State>): void;
}
export declare abstract class BaseComponent<Props = Dictionary, State = Dictionary> extends PureComponent<Props, State> {
    static contextType: any;
    context: ViewContext;
}
declare function addPropsEquality(this: {
    prototype: {
        propEquality: any;
    };
}, propEquality: any): void;
declare function addStateEquality(this: {
    prototype: {
        stateEquality: any;
    };
}, stateEquality: any): void;
export declare function setRef<RefType>(ref: Ref<RefType> | void, current: RefType): void;
export {};
//# sourceMappingURL=vdom-util.d.ts.map