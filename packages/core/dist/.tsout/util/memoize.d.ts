import { Dictionary } from '../options.js';
export declare function memoize<Args extends any[], Res>(workerFunc: (...args: Args) => Res, resEquality?: (res0: Res, res1: Res) => boolean, teardownFunc?: (res: Res) => void): (...args: Args) => Res;
export declare function memoizeObjArg<Arg extends Dictionary, Res>(workerFunc: (arg: Arg) => Res, resEquality?: (res0: Res, res1: Res) => boolean, teardownFunc?: (res: Res) => void): (arg: Arg) => Res;
export type MemoiseArrayFunc<Args extends any[], Res> = (argSets: Args[]) => Res[];
export declare function memoizeArraylike<Args extends any[], Res>(// used at all?
workerFunc: (...args: Args) => Res, resEquality?: (res0: Res, res1: Res) => boolean, teardownFunc?: (res: Res) => void): MemoiseArrayFunc<Args, Res>;
export type MemoizeHashFunc<Args extends any[], Res> = (argHash: {
    [key: string]: Args;
}) => {
    [key: string]: Res;
};
export declare function memoizeHashlike<Args extends any[], Res>(workerFunc: (...args: Args) => Res, resEquality?: (res0: Res, res1: Res) => boolean, teardownFunc?: (res: Res) => void): MemoizeHashFunc<Args, Res>;
//# sourceMappingURL=memoize.d.ts.map