import { join as joinPaths, relative as relativizePath } from 'path';
import { execLive, spawnLive } from './exec.js';
import { stringifyJson, writeIfDifferent } from './fs.js';
import { traverseMonorepoGreedy } from './monorepo-struct.js';
import { standardScriptsDir } from './script-runner.js';
import { log } from './log.js';
export async function compileTs(dir, tscArgs = []) {
    await execLive([
        joinPaths(standardScriptsDir, 'node_modules/.bin/tsc'),
        '-b',
        ...tscArgs,
    ], {
        cwd: dir,
    });
}
export async function watchTs(dir, tscArgs = []) {
    log('Pre-watch tsc compiling...');
    await compileTs(dir, tscArgs);
    // for watching, will compile again but will be quick
    return spawnLive([
        joinPaths(standardScriptsDir, 'node_modules/.bin/tsc'),
        '-b', '--watch',
        ...tscArgs,
    ], {
        cwd: dir,
    });
}
export async function writeTsconfigs(monorepoStruct, startPkgDir = '') {
    const refDirs = [];
    await traverseMonorepoGreedy(monorepoStruct, async (pkgStruct) => {
        if (await writePkgTsconfig(pkgStruct, monorepoStruct)) {
            refDirs.push(pkgStruct.pkgDir);
        }
    }, startPkgDir);
    if (!startPkgDir) {
        await writePkgTsconfigWithRefs(monorepoStruct.monorepoDir, refDirs, { files: [] });
    }
}
async function writePkgTsconfig(pkgStruct, monorepoStruct) {
    const { pkgDir, pkgJson, localDepDirs } = pkgStruct;
    const { tsConfig } = pkgJson;
    if (tsConfig) {
        const refDirs = [];
        for (let localDepDir of localDepDirs) {
            const depPkgJson = monorepoStruct.pkgDirToJson[localDepDir];
            if (depPkgJson.tsConfig) {
                refDirs.push(localDepDir);
            }
        }
        await writePkgTsconfigWithRefs(pkgDir, refDirs, tsConfig);
        return true;
    }
    return false;
}
async function writePkgTsconfigWithRefs(pkgDir, refDirs, // gets modified in-place
tsConfigBase) {
    refDirs.sort(); // deterministic order
    const finalTsConfig = {
        ...tsConfigBase,
        references: [
            ...(tsConfigBase.references || []),
            ...refDirs.map((refDir) => ({
                path: relativizePath(pkgDir, refDir),
            })),
        ],
    };
    await writeIfDifferent(joinPaths(pkgDir, 'tsconfig.json'), stringifyJson(finalTsConfig));
}
//# sourceMappingURL=monorepo-ts.js.map