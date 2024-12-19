import { PkgAnalysis } from '../utils/pkg-analysis.js';
import { ScriptContext } from '../utils/script-runner.js';
import { MonorepoStruct } from '../utils/monorepo-struct.js';
export default function (this: ScriptContext, ...args: string[]): Promise<void>;
export declare function buildPkg(pkgDir: string, monorepoStruct: MonorepoStruct, isDev: boolean): Promise<void>;
export declare function writeDistNpmIgnore(pkgDir: string): Promise<void>;
export declare function writeDistReadme(pkgDir: string): Promise<void>;
export declare function writeDistLicense(pkgAnalysis: PkgAnalysis): Promise<void>;
export declare function deleteBuiltFiles(pkgDir: string): Promise<void>;
//# sourceMappingURL=build.d.ts.map