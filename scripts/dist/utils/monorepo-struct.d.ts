import { ContinuousAsyncFuncRes } from './lang.js';
export interface MonorepoStruct {
    monorepoDir: string;
    monorepoPkgJson: any;
    monorepoConfigPath: string;
    pkgNameToDir: {
        [name: string]: string;
    };
    pkgDirToJson: {
        [dir: string]: any;
    };
}
export interface PkgStruct {
    pkgDir: string;
    pkgJson: any;
    localDepDirs: string[];
}
export declare function watchMonorepo(monorepoDir: string, handleMonorepo: (monorepoStruct: MonorepoStruct) => ContinuousAsyncFuncRes, initialMonorepoStruct?: MonorepoStruct): Promise<() => void>;
export declare function traverseMonorepoGreedy(monorepoStruct: MonorepoStruct, handlePkg: (pkgStruct: PkgStruct) => (Promise<void> | void), startPkgDir?: string): Promise<void>;
export declare function traverseMonorepo(monorepoStruct: MonorepoStruct, handlePkg: (pkgStruct: PkgStruct) => ContinuousAsyncFuncRes, startPkgDir?: string): Promise<() => void>;
export declare function computeLocalDepDirs(monorepoStruct: MonorepoStruct, pkgJson: any): string[];
export declare function readMonorepo(monorepoDir: string): Promise<MonorepoStruct>;
//# sourceMappingURL=monorepo-struct.d.ts.map