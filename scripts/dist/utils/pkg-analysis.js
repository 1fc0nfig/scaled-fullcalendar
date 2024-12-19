import { join as joinPaths, basename } from 'path';
export function analyzePkg(pkgDir) {
    const pkgDirName = basename(pkgDir);
    const isTests = pkgDirName === 'tests';
    const isBundle = pkgDirName === 'bundle';
    const metaRootDir = joinPaths(pkgDir, (isTests || isBundle) ? '..' : '../..');
    return {
        metaRootDir,
        pkgDir,
        isTests,
        isBundle,
    };
}
//# sourceMappingURL=pkg-analysis.js.map