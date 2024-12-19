import { MonorepoStruct } from '../utils/monorepo-struct.js';
import { ScriptContext } from '../utils/script-runner.js';
export default function (this: ScriptContext, ...args: string[]): Promise<void>;
export declare function writeBundles(pkgDir: string, pkgJson: any, monorepoStruct: MonorepoStruct, isDev: boolean): Promise<void>;
export declare function watchBundles(pkgDir: string, pkgJson: any, monorepoStruct: MonorepoStruct, isDev: boolean): Promise<() => void>;
//# sourceMappingURL=bundle.d.ts.map