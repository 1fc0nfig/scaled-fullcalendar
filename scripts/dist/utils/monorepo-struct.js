import { join as joinPaths, dirname } from 'path';
import { readFile } from 'fs/promises';
import { watch as watchPaths } from 'chokidar';
import { globby } from 'globby';
import * as semver from 'semver';
import * as yaml from 'js-yaml';
import { getPkgJsonPath, readPkgJson } from './pkg-json.js';
import { continuousAsync } from './lang.js';
export async function watchMonorepo(monorepoDir, handleMonorepo, initialMonorepoStruct) {
    return continuousAsync(async (rerun) => {
        const monorepoStruct = initialMonorepoStruct || (await readMonorepo(monorepoDir));
        initialMonorepoStruct = undefined;
        const relevantPaths = getMonorepoRelevantPaths(monorepoStruct);
        const watcher = watchPaths(relevantPaths, { ignoreInitial: true });
        watcher.once('all', rerun);
        const cleanupFunc = await handleMonorepo(monorepoStruct);
        return () => {
            watcher.close();
            cleanupFunc && cleanupFunc();
        };
    });
}
/*
Like traverseMonorepo, but handlers will not delay traversal of dependents
*/
export async function traverseMonorepoGreedy(monorepoStruct, handlePkg, startPkgDir = '') {
    const promises = [];
    await traverseMonorepo(monorepoStruct, (pkgStruct) => {
        const promise = handlePkg(pkgStruct);
        if (promise) {
            promises.push(promise);
        }
    }, startPkgDir);
    await Promise.all(promises);
}
export async function traverseMonorepo(monorepoStruct, handlePkg, startPkgDir = '') {
    const { pkgDirToJson } = monorepoStruct;
    const promiseMap = {};
    const cleanupFuncs = [];
    if (startPkgDir) {
        await traversePkg(startPkgDir);
    }
    else {
        await Promise.all(Object.keys(pkgDirToJson).map((pkgDir) => traversePkg(pkgDir)));
    }
    return () => {
        for (let cleanupFunc of cleanupFuncs) {
            cleanupFunc();
        }
    };
    function traversePkg(pkgDir) {
        return (promiseMap[pkgDir] || (promiseMap[pkgDir] = (async function () {
            const pkgJson = pkgDirToJson[pkgDir];
            if (!pkgJson) {
                throw new Error(`Unknown package at '${pkgDir}'`);
            }
            const localDepDirs = computeLocalDepDirs(monorepoStruct, pkgJson);
            await Promise.all(localDepDirs.map((localDepDir) => traversePkg(localDepDir)));
            const cleanupFunc = await handlePkg({
                pkgDir,
                pkgJson,
                localDepDirs,
            });
            if (cleanupFunc) {
                cleanupFuncs.push(cleanupFunc);
            }
        })()));
    }
}
export function computeLocalDepDirs(monorepoStruct, pkgJson) {
    const { pkgNameToDir, pkgDirToJson } = monorepoStruct;
    const depMap = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
    const localDepDirs = [];
    for (let depName in depMap) {
        const depSpecifier = depMap[depName];
        // TODO: workspace protocol accepts directory too
        const localDepMatch = depSpecifier.match(/^workspace:(.*)$/);
        const depVersionRange = localDepMatch ? localDepMatch[1] : depSpecifier;
        const depDir = pkgNameToDir[depName];
        const depJsonObj = pkgDirToJson[depDir];
        if (depJsonObj && (depVersionRange === '*' || // workaround for '*' not matching prerelease tags
            semver.satisfies(depJsonObj.version, depVersionRange))) {
            localDepDirs.push(depDir);
        }
        else if (localDepMatch) {
            throw new Error(`Workspace package '${depName}@${depJsonObj.version}' ` +
                `does not match '${depSpecifier}'`);
        }
    }
    return localDepDirs;
}
export async function readMonorepo(monorepoDir) {
    const { monorepoPkgJson, monorepoConfigPath, pkgDirGlobs } = await getMonorepoMeta(monorepoDir);
    const pkgDirs = await expandMonorepoPkgDirGlobs(monorepoDir, pkgDirGlobs);
    const pkgJsonObjs = await Promise.all(pkgDirs.map((pkgDir) => readPkgJson(pkgDir)));
    const pkgNameToDir = {};
    const pkgDirToJson = {};
    for (let i = 0; i < pkgJsonObjs.length; i++) {
        const pkgJson = pkgJsonObjs[i];
        const pkgName = pkgJson.name;
        const pkgDir = pkgDirs[i];
        if (!pkgName) {
            throw new Error(`Package '${pkgDir}' must have a name`);
        }
        if (!pkgJson.version) {
            throw new Error(`Package '${pkgDir}' must have a version`);
        }
        pkgNameToDir[pkgName] = pkgDir;
        pkgDirToJson[pkgDir] = pkgJson;
    }
    return { monorepoPkgJson, monorepoConfigPath, monorepoDir, pkgNameToDir, pkgDirToJson };
}
async function getMonorepoMeta(monorepoDir) {
    const monorepoPkgJson = await readPkgJson(monorepoDir);
    const pnpmWorkspaceConfigPath = joinPaths(monorepoDir, 'pnpm-workspace.yaml');
    const pnpmWorkspaceConfig = await readFile(pnpmWorkspaceConfigPath, 'utf8').then((str) => yaml.load(str), () => false);
    let monorepoConfigPath;
    let pkgDirGlobs;
    if (pnpmWorkspaceConfig) {
        monorepoConfigPath = pnpmWorkspaceConfigPath;
        pkgDirGlobs = pnpmWorkspaceConfig.packages;
    }
    else {
        monorepoConfigPath = getPkgJsonPath(monorepoDir);
        pkgDirGlobs = monorepoPkgJson;
    }
    if (!pkgDirGlobs) {
        throw new Error(`${monorepoDir} does not appear to be a monorepo`);
    }
    return { monorepoPkgJson, monorepoConfigPath, pkgDirGlobs };
}
async function expandMonorepoPkgDirGlobs(monorepoDir, pkgDirGlobs) {
    const relJsonPaths = await globby(pkgDirGlobs.map((pkgDirGlob) => getPkgJsonPath(pkgDirGlob)), { cwd: monorepoDir });
    const pkgDirs = relJsonPaths.map((relJsonPath) => joinPaths(monorepoDir, dirname(relJsonPath)));
    return pkgDirs;
}
function getMonorepoRelevantPaths(monorepoStruct) {
    const relevantPaths = [monorepoStruct.monorepoConfigPath];
    for (const pkgDir in monorepoStruct.pkgDirToJson) {
        relevantPaths.push(getPkgJsonPath(pkgDir));
    }
    return relevantPaths;
}
//# sourceMappingURL=monorepo-struct.js.map