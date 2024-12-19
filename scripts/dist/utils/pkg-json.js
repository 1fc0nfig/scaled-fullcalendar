import { join as joinPaths } from 'path';
import { readJson, writeJson } from './fs.js';
export function readPkgJson(pkgDir) {
    return readJson(getPkgJsonPath(pkgDir));
}
export async function writePkgJson(pkgDir, pkgJson) {
    return writeJson(getPkgJsonPath(pkgDir), pkgJson);
}
export function getPkgJsonPath(pkgDir) {
    return joinPaths(pkgDir, 'package.json');
}
//# sourceMappingURL=pkg-json.js.map