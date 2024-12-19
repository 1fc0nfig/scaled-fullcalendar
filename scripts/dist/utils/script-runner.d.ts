import { MonorepoStruct } from './monorepo-struct.js';
export interface ScriptContext {
    cwd: string;
    monorepoStruct: MonorepoStruct;
    scriptName: string;
}
export declare const standardScriptsDir: string;
export declare function runScript(scriptPkgDir: string): Promise<void>;
//# sourceMappingURL=script-runner.d.ts.map