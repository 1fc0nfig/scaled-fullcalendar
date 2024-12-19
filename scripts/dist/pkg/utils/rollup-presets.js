import { readFile } from 'fs/promises';
import { join as joinPaths } from 'path';
import handlebars from 'handlebars';
import nodeResolvePlugin from '@rollup/plugin-node-resolve';
import dtsPlugin from 'rollup-plugin-dts';
import sourcemapsPlugin from 'rollup-plugin-sourcemaps';
import commonjsPluginLib from '@rollup/plugin-commonjs';
import jsonPluginLib from '@rollup/plugin-json';
import postcssPluginLib from 'rollup-plugin-postcss';
import replacePluginLib from '@rollup/plugin-replace';
import { mapProps } from '../../utils/lang.js';
import { analyzePkg } from '../../utils/pkg-analysis.js';
import { readPkgJson } from '../../utils/pkg-json.js';
import { standardScriptsDir } from '../../utils/script-runner.js';
import { transpiledExtension, transpiledSubdir, cjsExtension, esmExtension, iifeSubextension, assetExtensions, srcIifeSubextension, manualChunkEntryAliases, } from './config.js';
import { computeExternalPkgs, computeIifeExternalPkgs, computeIifeGlobals, computeOwnExternalPaths, computeOwnIifeExternalPaths, entryStructsToContentMap, generateIifeContent, splitPkgNames, } from './bundle-struct.js';
import { externalizeExtensionsPlugin, externalizePathsPlugin, externalizePkgsPlugin, generatedContentPlugin, minifySeparatelyPlugin, massageDtsPlugin, rerootPlugin, simpleDotAssignment, } from './rollup-plugins.js';
const commonjsPlugin = cjsInterop(commonjsPluginLib);
const jsonPlugin = cjsInterop(jsonPluginLib);
const postcssPlugin = cjsInterop(postcssPluginLib);
const replacePlugin = cjsInterop(replacePluginLib);
/*
TODO: converge with buildCjsOptions and just have multiple outputs?
*/
export function buildEsmOptions(pkgBundleStruct, monorepoStruct, sourcemap) {
    return {
        input: buildModuleInput(pkgBundleStruct),
        plugins: buildModulePlugins(pkgBundleStruct, monorepoStruct, esmExtension, sourcemap),
        output: buildEsmOutputOptions(pkgBundleStruct, sourcemap),
        onwarn,
    };
}
export function buildCjsOptions(pkgBundleStruct, monorepoStruct, sourcemap) {
    return {
        input: buildModuleInput(pkgBundleStruct),
        plugins: buildModulePlugins(pkgBundleStruct, monorepoStruct, cjsExtension, sourcemap),
        output: buildCjsOutputOptions(pkgBundleStruct, sourcemap),
        onwarn,
    };
}
export async function buildIifeOptions(pkgBundleStruct, monorepoStruct, minify, sourcemap) {
    const { entryConfigMap, entryStructMap } = pkgBundleStruct;
    const banner = await buildBanner(pkgBundleStruct);
    const iifeContentMap = await generateIifeContent(pkgBundleStruct);
    const optionsObjs = [];
    for (let entryAlias in entryStructMap) {
        const entryStruct = entryStructMap[entryAlias];
        const entryConfig = entryConfigMap[entryStruct.entryGlob];
        if (entryConfig.iife) {
            optionsObjs.push({
                input: buildIifeInput(entryStruct),
                plugins: buildIifePlugins(entryStruct, pkgBundleStruct, iifeContentMap, sourcemap, minify),
                output: buildIifeOutputOptions(entryStruct, entryAlias, pkgBundleStruct, monorepoStruct, banner, sourcemap),
                onwarn,
            });
        }
    }
    return optionsObjs;
}
export function buildDtsOptions(pkgBundleStruct) {
    return {
        input: buildDtsInput(pkgBundleStruct),
        plugins: buildDtsPlugins(pkgBundleStruct),
        output: buildDtsOutputOptions(pkgBundleStruct),
        onwarn,
    };
}
function buildModuleInput(pkgBundleStruct) {
    return mapProps(pkgBundleStruct.entryStructMap, (entryStruct) => {
        return entryStruct.entrySrcPath;
    });
}
function buildIifeInput(entryStruct) {
    return entryStruct.entrySrcBase + srcIifeSubextension + transpiledExtension;
}
function buildDtsInput(pkgBundleStruct) {
    return mapProps(pkgBundleStruct.entryStructMap, (entryStruct) => {
        return entryStruct.entrySrcBase + '.d.ts';
    });
}
// Output
// -------------------------------------------------------------------------------------------------
function buildEsmOutputOptions(pkgBundleStruct, sourcemap) {
    return {
        format: 'esm',
        dir: joinPaths(pkgBundleStruct.pkgDir, 'dist'),
        entryFileNames: '[name]' + esmExtension,
        chunkFileNames: '[name]' + esmExtension,
        manualChunks: buildManualChunks(pkgBundleStruct, transpiledExtension),
        sourcemap,
    };
}
function buildCjsOutputOptions(pkgBundleStruct, sourcemap) {
    return {
        format: 'cjs',
        exports: 'named',
        dir: joinPaths(pkgBundleStruct.pkgDir, 'dist'),
        entryFileNames: '[name]' + cjsExtension,
        chunkFileNames: '[name]' + cjsExtension,
        manualChunks: buildManualChunks(pkgBundleStruct, transpiledExtension),
        sourcemap,
    };
}
function buildIifeOutputOptions(entryStruct, entryAlias, pkgBundleStruct, monorepoStruct, banner, sourcemap) {
    const { pkgDir, iifeGlobalsMap } = pkgBundleStruct;
    const globalName = iifeGlobalsMap[entryStruct.entryGlob];
    return {
        format: 'iife',
        banner,
        file: joinPaths(pkgDir, 'dist', entryAlias) + iifeSubextension + '.js',
        globals: computeIifeGlobals(pkgBundleStruct, monorepoStruct),
        ...(globalName
            ? { exports: 'named', name: globalName }
            : { exports: 'none' }),
        interop: 'auto',
        freeze: false,
        sourcemap,
    };
}
function buildDtsOutputOptions(pkgBundleStruct) {
    return {
        format: 'esm',
        dir: joinPaths(pkgBundleStruct.pkgDir, 'dist'),
        entryFileNames: '[name].d.ts',
        chunkFileNames: '[name].d.ts',
        manualChunks: buildManualChunks(pkgBundleStruct, '.d.ts'),
    };
}
// Chunk Options
// -------------------------------------------------------------------------------------------------
function buildManualChunks(pkgBundleStruct, inExtension) {
    const { pkgDir, entryStructMap } = pkgBundleStruct;
    const manualChunks = {};
    for (const chunkName in manualChunkEntryAliases) {
        const entryAliases = manualChunkEntryAliases[chunkName];
        const validEntryPaths = [];
        for (const entryAlias of entryAliases) {
            if (entryStructMap[entryAlias]) {
                validEntryPaths.push(joinPaths(pkgDir, transpiledSubdir, entryAlias + inExtension));
            }
        }
        if (validEntryPaths.length) {
            manualChunks[chunkName] = validEntryPaths;
        }
    }
    return manualChunks;
}
// Plugins Lists
// -------------------------------------------------------------------------------------------------
function buildModulePlugins(pkgBundleStruct, monorepoStruct, forceOurExtension, sourcemap) {
    const { pkgDir, entryStructMap } = pkgBundleStruct;
    const { ourPkgNames, theirPkgNames } = splitPkgNames(computeExternalPkgs(pkgBundleStruct), monorepoStruct);
    return [
        rerootAssetsPlugin(pkgDir),
        externalizePkgsPlugin({
            pkgNames: theirPkgNames,
        }),
        externalizePkgsPlugin({
            pkgNames: ourPkgNames,
            forceExtension: forceOurExtension,
        }),
        generatedContentPlugin(entryStructsToContentMap(entryStructMap)),
        ...buildJsPlugins(pkgBundleStruct),
        ...(sourcemap ? [sourcemapsPlugin()] : []), // load preexisting sourcemaps
    ];
}
/*
TODO: inefficient to repeatedly generate all this?
*/
function buildIifePlugins(currentEntryStruct, pkgBundleStruct, iifeContentMap, sourcemap, minify) {
    const { pkgDir, entryStructMap } = pkgBundleStruct;
    return [
        rerootAssetsPlugin(pkgDir),
        externalizePkgsPlugin({
            pkgNames: computeIifeExternalPkgs(pkgBundleStruct),
        }),
        externalizePathsPlugin({
            paths: computeOwnIifeExternalPaths(currentEntryStruct, pkgBundleStruct),
        }),
        generatedContentPlugin({
            ...entryStructsToContentMap(entryStructMap),
            ...iifeContentMap,
        }),
        simpleDotAssignment(),
        ...buildJsPlugins(pkgBundleStruct),
        ...(sourcemap ? [sourcemapsPlugin()] : []),
        ...(minify ? [minifySeparatelyPlugin()] : []),
    ];
}
function buildDtsPlugins(pkgBundleStruct) {
    return [
        externalizeAssetsPlugin(),
        externalizePkgsPlugin({
            pkgNames: computeExternalPkgs(pkgBundleStruct),
            moduleSideEffects: true, // for including ambient declarations in other packages
        }),
        // rollup-plugin-dts normally gets confused with code splitting. this helps a lot.
        externalizePathsPlugin({
            paths: computeOwnExternalPaths(pkgBundleStruct),
        }),
        dtsPlugin(),
        massageDtsPlugin(),
        nodeResolvePlugin({
            ignoreSideEffectsForRoot: true,
        }),
    ];
}
function buildJsPlugins(pkgBundleStruct) {
    const pkgAnalysis = analyzePkg(pkgBundleStruct.pkgDir);
    if (pkgAnalysis.isTests) {
        return buildTestJsPlugins();
    }
    else {
        return buildNormalJsPlugins(pkgBundleStruct);
    }
}
function buildNormalJsPlugins(pkgBundleStruct) {
    const { pkgDir, pkgJson } = pkgBundleStruct;
    return [
        nodeResolvePlugin({
            ignoreSideEffectsForRoot: true,
        }),
        cssPlugin({
            inject: {
                importId: pkgJson.name === '@fullcalendar/core' ?
                    joinPaths(pkgDir, transpiledSubdir, 'styleUtils' + transpiledExtension) :
                    '@fullcalendar/core/internal',
                importProp: 'injectStyles',
            },
        }),
        replacePlugin({
            delimiters: ['<%= ', ' %>'],
            preventAssignment: true,
            values: {
                releaseDate: new Date().toISOString().replace(/T.*/, ''),
                pkgName: pkgJson.name,
                pkgVersion: pkgJson.version,
            },
        }),
    ];
}
function buildTestJsPlugins() {
    return [
        nodeResolvePlugin({
            browser: true,
            preferBuiltins: false,
            ignoreSideEffectsForRoot: true,
        }),
        commonjsPlugin(),
        jsonPlugin(),
        cssPlugin({ inject: true }),
        replacePlugin({
            preventAssignment: true,
            values: {
                'process.env.NODE_ENV': '"development"',
            },
        }),
    ];
}
function cssPlugin(options) {
    const { inject } = options || {};
    return postcssPlugin({
        config: {
            path: joinPaths(standardScriptsDir, 'config/postcss.config.cjs'),
            ctx: {}, // arguments given to config file
        },
        inject: typeof inject === 'object' ?
            (cssVarName) => {
                return `import { ${inject.importProp} } from ${JSON.stringify(inject.importId)};\n` +
                    `injectStyles(${cssVarName});\n`;
            } :
            (inject || false),
        minimize: true,
    });
}
function rerootAssetsPlugin(pkgDir) {
    return rerootPlugin({
        extensions: assetExtensions,
        oldRoot: joinPaths(pkgDir, 'dist', '.tsout'),
        newRoot: joinPaths(pkgDir, 'src'),
    });
}
function externalizeAssetsPlugin() {
    return externalizeExtensionsPlugin(assetExtensions);
}
// Misc
// -------------------------------------------------------------------------------------------------
async function buildBanner(pkgBundleStruct) {
    const { pkgDir, pkgJson } = pkgBundleStruct;
    const pkgAnalysis = analyzePkg(pkgDir);
    const basePkgJson = await readPkgJson(pkgAnalysis.metaRootDir); // TODO: use a cached version
    const fullPkgJson = { ...basePkgJson, ...pkgJson };
    // TODO: cache the template
    const templatePath = joinPaths(standardScriptsDir, 'config/banner.tpl');
    const templateText = await readFile(templatePath, 'utf8');
    const template = handlebars.compile(templateText);
    return template(fullPkgJson).trim();
}
function onwarn(warning) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        console.error(warning.toString());
    }
}
function cjsInterop(namespace) {
    return namespace.default || namespace;
}
//# sourceMappingURL=rollup-presets.js.map