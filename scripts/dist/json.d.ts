import { ScriptContext } from './utils/script-runner.js';
import { MonorepoStruct } from './utils/monorepo-struct.js';
export default function (this: ScriptContext, ...args: string[]): Promise<void>;
export declare function writeDistPkgJsons(monorepoStruct: MonorepoStruct, isDev: boolean, reuseExisting?: boolean): Promise<void>;
//# sourceMappingURL=json.d.ts.map