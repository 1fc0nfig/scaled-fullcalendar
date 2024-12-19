import { dirname } from 'path';
import { readFile, writeFile, mkdir, lstat } from 'fs/promises';
export async function ensureFileDir(path) {
    await mkdir(dirname(path), { recursive: true });
}
export async function readJson(path) {
    const srcJson = await readFile(path, 'utf8');
    const srcMeta = JSON.parse(srcJson);
    return srcMeta;
}
export async function writeJson(path, obj) {
    await writeFile(path, stringifyJson(obj));
}
export function stringifyJson(obj) {
    return JSON.stringify(obj, undefined, 2) + '\n';
}
export async function writeIfDifferent(path, content) {
    const existingContent = await readFile(path, 'utf8').catch(() => false);
    if (existingContent === false || existingContent !== content) {
        await writeFile(path, content);
        return true;
    }
    return false;
}
export function fileExists(path) {
    return lstat(path).then(() => true, () => false);
}
//# sourceMappingURL=fs.js.map