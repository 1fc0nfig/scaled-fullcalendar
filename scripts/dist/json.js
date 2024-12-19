import { join as joinPaths } from 'path';
import { fileExists } from './utils/fs.js';
import { traverseMonorepoGreedy } from './utils/monorepo-struct.js';
import { writeDistPkgJson } from './pkg/json.js';
export default async function (...args) {
    const isDev = args.includes('--dev');
    await writeDistPkgJsons(this.monorepoStruct, isDev);
}
export function writeDistPkgJsons(monorepoStruct, isDev, reuseExisting = false) {
    return traverseMonorepoGreedy(monorepoStruct, async (pkgStruct) => {
        const { pkgDir, pkgJson } = pkgStruct;
        if (pkgJson.buildConfig) {
            if (!reuseExisting ||
                !(await fileExists(joinPaths(pkgDir, 'dist/package.json')))) {
                await writeDistPkgJson(pkgDir, pkgJson, isDev);
            }
        }
    });
}
//# sourceMappingURL=json.js.map