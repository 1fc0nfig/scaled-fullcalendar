import { join as joinPaths } from 'path';
import { copyFile, rm, writeFile } from 'fs/promises';
import { globby } from 'globby';
import { writeDistPkgJson } from './json.js';
import { analyzePkg } from '../utils/pkg-analysis.js';
import { writeBundles } from './bundle.js';
import { compileTs, writeTsconfigs } from '../utils/monorepo-ts.js';
const tscArtifacts = [
    '.tsout',
    'tsconfig.tsbuildinfo',
];
const pathsToDelete = [
    './dist/*',
    // leave tscArtifacts
    ...tscArtifacts.map((artifact) => `!./dist/${artifact}`),
];
export default async function (...args) {
    const { monorepoStruct } = this;
    const pkgDir = this.cwd;
    const isDev = args.includes('--dev');
    await buildPkg(pkgDir, monorepoStruct, isDev);
}
export async function buildPkg(pkgDir, monorepoStruct, isDev) {
    const pkgJson = monorepoStruct.pkgDirToJson[pkgDir];
    const pkgAnalysis = analyzePkg(pkgDir);
    const { isTests } = pkgAnalysis;
    await deleteBuiltFiles(pkgDir);
    await writeTsconfigs(monorepoStruct, pkgDir);
    if (!isTests) {
        await writeDistPkgJson(pkgDir, pkgJson, isDev);
    }
    // tsc needs tsconfig.json and package.json from above
    await compileTs(pkgDir);
    await Promise.all([
        writeBundles(pkgDir, pkgJson, monorepoStruct, isDev),
        !isTests && writeDistNpmIgnore(pkgDir),
        !isTests && writeDistReadme(pkgDir),
        !isTests && writeDistLicense(pkgAnalysis), // needs dist folder
    ]);
}
export async function writeDistNpmIgnore(pkgDir) {
    await writeFile(joinPaths(pkgDir, 'dist', '.npmignore'), tscArtifacts.join('\n') + '\n');
}
export async function writeDistReadme(pkgDir) {
    await copyFile(joinPaths(pkgDir, 'README.md'), joinPaths(pkgDir, 'dist', 'README.md'));
}
export async function writeDistLicense(pkgAnalysis) {
    await copyFile(joinPaths(pkgAnalysis.metaRootDir, 'LICENSE.md'), joinPaths(pkgAnalysis.pkgDir, 'dist', 'LICENSE.md'));
}
export async function deleteBuiltFiles(pkgDir) {
    const relPaths = await globby(pathsToDelete, { cwd: pkgDir, onlyFiles: false });
    await Promise.all(relPaths.map(async (relPath) => {
        await rm(joinPaths(pkgDir, relPath), { force: true, recursive: true });
    }));
}
//# sourceMappingURL=build.js.map