import { join as joinPaths } from 'path';
import { globby } from 'globby';
import { computeLocalDepDirs } from '../../utils/monorepo-struct.js';
import { filterProps } from '../../utils/lang.js';
import { pkgLog } from '../../utils/log.js';
import { srcExtensions, transpiledSubdir, transpiledExtension, srcIifeSubextension } from './config.js';
export async function buildPkgBundleStruct(pkgDir, pkgJson) {
    const buildConfig = pkgJson.buildConfig || {};
    const entryConfigMap = buildConfig.exports || {};
    const entryStructMap = {};
    const iifeGlobalsMap = buildConfig.iifeGlobals || {};
    const miscWatchPaths = [];
    await Promise.all(Object.keys(entryConfigMap).map(async (entryGlob) => {
        const entryConfig = entryConfigMap[entryGlob];
        const newEntryStructMap = entryConfig.generator ?
            await generateEntryStructMap(pkgDir, pkgJson, entryGlob, entryConfig.generator, miscWatchPaths) :
            await unglobEntryStructMap(pkgDir, entryGlob);
        Object.assign(entryStructMap, newEntryStructMap);
    }));
    return { pkgDir, pkgJson, entryConfigMap, entryStructMap, iifeGlobalsMap, miscWatchPaths };
}
// Source-File Entrypoints
// -------------------------------------------------------------------------------------------------
async function unglobEntryStructMap(pkgDir, entryGlob) {
    const entryStructMap = {};
    const massagedGlob = (entryGlob === '.' ? 'index' : removeDotSlash(entryGlob)) +
        '{' + srcExtensions.join(',') + '}';
    const transpiledDir = joinPaths(pkgDir, transpiledSubdir);
    const srcDir = joinPaths(pkgDir, 'src');
    const srcPaths = await globby(massagedGlob, { cwd: srcDir });
    if (!srcPaths.length) {
        throw new Error(`Glob '${entryGlob}' does not exist in package '${pkgDir}'`);
    }
    for (const srcPath of srcPaths) {
        for (const srcExtension of srcExtensions) {
            if (srcPath.endsWith(srcExtension)) {
                const entryAlias = srcPath.substring(0, srcPath.length - srcExtension.length);
                const entrySrcBase = joinPaths(transpiledDir, entryAlias);
                const entrySrcPath = entrySrcBase + transpiledExtension;
                entryStructMap[entryAlias] = { entryGlob, entrySrcPath, entrySrcBase };
            }
        }
    }
    return entryStructMap;
}
// Dynamically-Generated Entrypoint Content
// -------------------------------------------------------------------------------------------------
async function generateEntryStructMap(pkgDir, pkgJson, entryGlob, generatorSubpath, miscWatchPaths) {
    const generatorPath = joinPaths(pkgDir, generatorSubpath);
    const generatorExports = await import(generatorPath);
    const generatorFunc = generatorExports.default;
    if (typeof generatorFunc !== 'function') {
        throw new Error('Generator must have a default function export');
    }
    const generatorConfig = { pkgDir, entryGlob, log: pkgLog.bind(undefined, pkgJson.name) };
    const generatorRes = await generatorFunc(generatorConfig);
    const transpiledDir = joinPaths(pkgDir, transpiledSubdir);
    const entryStructMap = {};
    if (typeof generatorRes === 'string') {
        if (entryGlob.includes('*')) {
            throw new Error('Generator string output can\'t have blob entrypoint name');
        }
        const entrySrcBase = joinPaths(transpiledDir, entryGlob);
        const entrySrcPath = entrySrcBase + transpiledExtension;
        const entryAlias = removeDotSlash(entryGlob);
        entryStructMap[entryAlias] = {
            entryGlob,
            entrySrcPath,
            entrySrcBase,
            content: generatorRes,
        };
    }
    else if (typeof generatorRes === 'object') {
        if (entryGlob.includes('*')) {
            throw new Error('Generator object output must have blob entrypoint name');
        }
        for (const key in generatorRes) {
            const entryAlias = removeDotSlash(entryGlob).replace('*', key);
            const entrySrcBase = joinPaths(transpiledDir, entryAlias);
            const entrySrcPath = entrySrcBase + transpiledExtension;
            entryStructMap[entryAlias] = {
                entryGlob,
                entrySrcPath,
                entrySrcBase,
                content: generatorRes[key],
            };
        }
    }
    else {
        throw new Error('Invalid type of generator output');
    }
    miscWatchPaths.push(generatorPath, ...(generatorExports.getWatchPaths ? generatorExports.getWatchPaths(generatorConfig) : []));
    return entryStructMap;
}
export function entryStructsToContentMap(entryStructMap) {
    const contentMap = {};
    for (const entryAlias in entryStructMap) {
        const entryStruct = entryStructMap[entryAlias];
        if (typeof entryStruct.content === 'string') {
            contentMap[entryStruct.entrySrcPath] = entryStruct.content;
        }
    }
    return contentMap;
}
export async function generateIifeContent(pkgBundleStruct) {
    const { pkgDir, entryConfigMap, entryStructMap } = pkgBundleStruct;
    const contentMap = {};
    for (const entryAlias in entryStructMap) {
        const entryStruct = entryStructMap[entryAlias];
        const entryConfig = entryConfigMap[entryStruct.entryGlob];
        const { iifeGenerator } = entryConfig;
        if (iifeGenerator) {
            const iifeGeneratorPath = joinPaths(pkgDir, iifeGenerator);
            const iifeGeneratorExports = await import(iifeGeneratorPath);
            const iifeGeneratorFunc = iifeGeneratorExports.default;
            if (typeof iifeGeneratorFunc !== 'function') {
                throw new Error('iifeGenerator must have a default function export');
            }
            const iifeGeneratorConfig = {
                pkgDir,
                entryAlias,
                log: pkgLog.bind(undefined, pkgBundleStruct.pkgJson.name),
            };
            const iifeGeneratorRes = await iifeGeneratorFunc(iifeGeneratorConfig);
            if (typeof iifeGeneratorRes !== 'string') {
                throw new Error('iifeGenerator must return a string');
            }
            const transpiledDir = joinPaths(pkgDir, transpiledSubdir);
            const transpiledPath = joinPaths(transpiledDir, entryAlias) +
                srcIifeSubextension + transpiledExtension;
            contentMap[transpiledPath] = iifeGeneratorRes;
            pkgBundleStruct.miscWatchPaths.push(// HACK: modify passed-in struct
            iifeGeneratorPath, ...(iifeGeneratorExports.getWatchPaths ?
                iifeGeneratorExports.getWatchPaths(iifeGeneratorConfig) :
                []));
        }
    }
    return contentMap;
}
// External Packages
// -------------------------------------------------------------------------------------------------
export function computeExternalPkgs(pkgBundleStruct) {
    const { pkgJson } = pkgBundleStruct;
    return Object.keys({
        ...pkgJson.dependencies,
        ...pkgJson.peerDependencies,
        ...pkgJson.optionalDependencies,
    });
}
/*
For IIFE, some third-party packages are bundled
*/
export function computeIifeExternalPkgs(pkgBundleStruct) {
    const { iifeGlobalsMap } = pkgBundleStruct;
    return computeExternalPkgs(pkgBundleStruct)
        .filter((pkgName) => (iifeGlobalsMap[pkgName] !== '' &&
        iifeGlobalsMap['*'] !== ''));
}
export function splitPkgNames(pkgNames, monorepoStruct) {
    const ourPkgNames = [];
    const theirPkgNames = [];
    for (let pkgName of pkgNames) {
        if (monorepoStruct.pkgNameToDir[pkgName]) {
            ourPkgNames.push(pkgName);
        }
        else {
            theirPkgNames.push(pkgName);
        }
    }
    return { ourPkgNames, theirPkgNames };
}
// External File Paths
// -------------------------------------------------------------------------------------------------
export function computeOwnExternalPaths(pkgBundleStruct) {
    return Object.values(pkgBundleStruct.entryStructMap)
        .map((entryStruct) => entryStruct.entrySrcPath);
}
export function computeOwnIifeExternalPaths(currentEntryStruct, pkgBundleStruct) {
    const { entryStructMap, iifeGlobalsMap } = pkgBundleStruct;
    const currentGlobalName = iifeGlobalsMap[currentEntryStruct.entryGlob];
    const iifeEntryStructMap = filterProps(entryStructMap, (entryStruct) => {
        const globalName = iifeGlobalsMap[entryStruct.entryGlob];
        return Boolean(
        // not the current entrypoint
        entryStruct.entryGlob !== currentEntryStruct.entryGlob &&
            // has a global variable
            globalName &&
            // not nested within current global variable
            (!currentGlobalName || !globalName.startsWith(currentGlobalName + '.')));
    });
    return Object.values(iifeEntryStructMap)
        .map((entryStruct) => entryStruct.entrySrcPath);
}
// IIFE Browser Globals
// -------------------------------------------------------------------------------------------------
export function computeIifeGlobals(pkgBundleStruct, monorepoStruct) {
    const allGlobalsMap = {};
    const { pkgJson, entryStructMap, iifeGlobalsMap } = pkgBundleStruct;
    const pkgName = pkgJson.name;
    // scan the package's own unglobbed entrypoints
    for (const entryAlias in entryStructMap) {
        const { entrySrcPath, entryGlob } = entryStructMap[entryAlias];
        const globalName = iifeGlobalsMap[entryGlob];
        if (globalName) {
            const fullImportId = entryGlob === '.' ?
                pkgName :
                pkgName + '/' + entryAlias;
            allGlobalsMap[fullImportId] = globalName;
            allGlobalsMap[entrySrcPath] = globalName; // add file path too
        }
    }
    // scan the package's external dependencies
    // TODO: scan dependencies of dependencies (or just do a global scan)
    for (const importId in iifeGlobalsMap) {
        const globalName = iifeGlobalsMap[importId];
        if (globalName) {
            if (importId !== '.' && !importId.startsWith('./')) {
                allGlobalsMap[importId] = globalName;
            }
        }
    }
    const depDirs = computeLocalDepDirs(monorepoStruct, pkgJson);
    const depPkgJsons = depDirs.map((depDir) => monorepoStruct.pkgDirToJson[depDir]);
    // scan the package's dependencies that live in the monorepo
    for (const depPkgJson of depPkgJsons) {
        const depPkgName = depPkgJson.name;
        const depBuildConfig = depPkgJson.buildConfig || {};
        const depIifeGlobalsMap = depBuildConfig.iifeGlobals || {};
        for (const importId in depIifeGlobalsMap) {
            const globalName = depIifeGlobalsMap[importId];
            if (globalName) {
                if (importId === '.') {
                    allGlobalsMap[depPkgName] = globalName;
                }
                else if (importId.startsWith('./')) {
                    allGlobalsMap[depPkgName + importId.substring(1)] = globalName;
                }
            }
        }
    }
    return allGlobalsMap;
}
// Utils
// -------------------------------------------------------------------------------------------------
function removeDotSlash(path) {
    return path.replace(/^\.\//, '');
}
//# sourceMappingURL=bundle-struct.js.map