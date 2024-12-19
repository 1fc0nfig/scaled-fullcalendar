import { join as joinPaths } from 'path';
import { rm } from 'fs/promises';
const pathsToDelete = [
    './dist',
    './tsconfig.json',
    './tsconfig.tsbuildinfo',
    './.turbo',
];
export default async function () {
    const pkgDir = this.cwd;
    await cleanPkg(pkgDir);
}
export async function cleanPkg(pkgDir) {
    await Promise.all(pathsToDelete.map((path) => {
        return rm(joinPaths(pkgDir, path), { force: true, recursive: true });
    }));
}
//# sourceMappingURL=clean.js.map