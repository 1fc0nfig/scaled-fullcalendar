import { dirname } from 'path';
import { execSilent, execLive } from './exec.js';
export function assumeUnchanged(path, toggle = true) {
    return execSilent([
        'git', 'update-index',
        toggle ? '--assume-unchanged' : '--no-assume-unchanged',
        path,
    ], {
        cwd: dirname(path),
    });
}
export function checkoutFile(path) {
    return execSilent([
        'git', 'checkout', '--', path,
    ], {
        cwd: dirname(path),
    });
}
export function addFile(path) {
    return execSilent([
        'git', 'add', path,
    ], {
        cwd: dirname(path),
    });
}
export function commitDir(dir, message) {
    return execLive([
        'git', 'commit', '-m', message,
    ], {
        cwd: dir,
    });
}
export function isStaged(path) {
    return execSilent([
        'git', 'diff', '--quiet', '--staged', path, // implies --exit-code
    ], {
        cwd: dirname(path),
    }).then(() => false, // 0 exitCode means no difference
    (error) => error.exitCode === 1);
}
//# sourceMappingURL=git.js.map