import { MonorepoStruct } from './monorepo-struct.js';
export declare function compileTs(dir: string, tscArgs?: string[]): Promise<void>;
export declare function watchTs(dir: string, tscArgs?: string[]): Promise<() => void>;
export declare function writeTsconfigs(monorepoStruct: MonorepoStruct, startPkgDir?: string): Promise<void>;
//# sourceMappingURL=monorepo-ts.d.ts.map