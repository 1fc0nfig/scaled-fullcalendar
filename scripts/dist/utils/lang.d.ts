export declare function mapProps<V, R>(props: {
    [key: string]: V;
}, func: (val: V, key: string) => R): {
    [key: string]: R;
};
export declare function filterProps<V>(props: {
    [key: string]: V;
}, func: (val: V, key: string) => boolean): {
    [key: string]: V;
};
export declare function strsToProps(strs: string[]): {
    [str: string]: true;
};
export declare function boolPromise(promise: Promise<any>): Promise<boolean>;
export declare function arrayify(input: any): any[];
export declare function wait(ms: number): Promise<void>;
export type ContinuousAsyncFunc = (rerun: () => void) => ContinuousAsyncFuncRes;
export type ContinuousAsyncFuncRes = Promise<(() => void) | void> | (() => void) | void;
export declare function continuousAsync(workerFunc: ContinuousAsyncFunc): Promise<() => void>;
//# sourceMappingURL=lang.d.ts.map