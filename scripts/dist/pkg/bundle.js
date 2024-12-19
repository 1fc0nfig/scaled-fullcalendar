import { basename } from 'path';
import { watch } from 'chokidar';
import { rollup, watch as rollupWatch } from 'rollup';
import { buildPkgBundleStruct } from './utils/bundle-struct.js';
import { analyzePkg } from '../utils/pkg-analysis.js';
import { buildEsmOptions, buildCjsOptions, buildIifeOptions, buildDtsOptions } from './utils/rollup-presets.js';
import { arrayify, continuousAsync } from '../utils/lang.js';
import { untilSigInt } from '../utils/process.js';
import { pkgLog } from '../utils/log.js';
export default async function (...args) {
    const { monorepoStruct } = this;
    const pkgDir = this.cwd;
    const pkgJson = monorepoStruct.pkgDirToJson[pkgDir];
    const isWatch = args.includes('--watch');
    const isDev = args.includes('--dev');
    if (!isWatch) {
        await writeBundles(pkgDir, pkgJson, monorepoStruct, isDev);
    }
    else {
        const stopWatch = await watchBundles(pkgDir, pkgJson, monorepoStruct, isDev);
        await untilSigInt();
        stopWatch();
    }
}
export async function writeBundles(pkgDir, pkgJson, monorepoStruct, isDev) {
    const pkgBundleStruct = await buildPkgBundleStruct(pkgDir, pkgJson);
    const optionsObjs = await buildRollupOptionObjs(pkgBundleStruct, monorepoStruct, isDev);
    await Promise.all(optionsObjs.map(async (options) => {
        const bundle = await rollup(options);
        const outputOptionObjs = arrayify(options.output);
        await Promise.all(outputOptionObjs.map((outputOptions) => bundle.write(outputOptions)));
    }));
}
export async function watchBundles(pkgDir, pkgJson, monorepoStruct, isDev) {
    return continuousAsync(async (rerun) => {
        const pkgName = pkgJson.name;
        const pkgBundleStruct = await buildPkgBundleStruct(pkgDir, pkgJson);
        const optionsObjs = await buildRollupOptionObjs(pkgBundleStruct, monorepoStruct, isDev);
        const rollupWatcher = rollupWatch(optionsObjs);
        await new Promise((resolve) => {
            rollupWatcher.on('event', (ev) => {
                switch (ev.code) {
                    case 'ERROR':
                        console.error(ev.error);
                        break;
                    case 'BUNDLE_END':
                        pkgLog(pkgName, formatWriteMessage(ev.input, ev.output));
                        break;
                    case 'END':
                        resolve();
                        break;
                }
            });
        });
        const fileWatcher = watch(pkgBundleStruct.miscWatchPaths, { ignoreInitial: true });
        fileWatcher.once('all', () => {
            pkgLog(pkgName, 'Misc file change detected. Rebuilding all.');
            rerun();
        });
        return () => {
            rollupWatcher.close();
            fileWatcher.close();
        };
    });
}
async function buildRollupOptionObjs(pkgBundleStruct, monorepoStruct, isDev) {
    const { isBundle, isTests } = analyzePkg(pkgBundleStruct.pkgDir);
    const esm = !isTests;
    const cjs = !isDev && !isTests;
    const moduleSourcemap = isDev || isTests;
    const iife = true; // !isDev || isBundle || isTests
    const iifeMinify = !isDev && !isTests;
    const iifeSourcemap = (isBundle && isDev) || isTests;
    const dts = !isDev && !isTests;
    return [
        ...(esm ? [buildEsmOptions(pkgBundleStruct, monorepoStruct, moduleSourcemap)] : []),
        ...(cjs ? [buildCjsOptions(pkgBundleStruct, monorepoStruct, moduleSourcemap)] : []),
        ...(iife ? await buildIifeOptions(pkgBundleStruct, monorepoStruct, iifeMinify, iifeSourcemap) : []),
        ...(dts ? [buildDtsOptions(pkgBundleStruct)] : []),
    ];
}
function formatWriteMessage(input, outputPaths) {
    const inputPaths = typeof input === 'object' ? Object.values(input) : [input];
    const inputNames = inputPaths.map((inputPath) => basename(inputPath));
    const outputNames = outputPaths.map((outputPath) => basename(outputPath));
    return `Wrote ${formatNames(inputNames)} to ${formatNames(outputNames)}`;
}
function formatNames(names) {
    if (names.length <= 2) {
        return names.join(', ');
    }
    else {
        const otherCnt = names.length - 2;
        return names.slice(0, 2).join(', ') + ', and ' +
            otherCnt + ' ' + (otherCnt === 1 ? 'other' : 'others');
    }
}
//# sourceMappingURL=bundle.js.map