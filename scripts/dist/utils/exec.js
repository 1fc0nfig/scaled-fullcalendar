import { promisify } from 'util';
import { exec as execCb, execFile as execFileCb, spawn, } from 'child_process';
const exec = promisify(execCb);
const execFile = promisify(execFileCb);
export function execCapture(command, options = {}) {
    if (typeof command === 'string') {
        return exec(command, options)
            .then((res) => res.stdout);
    }
    else if (Array.isArray(command)) {
        return execFile(command[0], command.slice(1), options)
            .then((res) => res.stdout);
    }
    else {
        throw new Error('Invalid command type for execCapture()');
    }
}
export function execLive(command, options = {}) {
    return execWithStdio(command, options, 'inherit');
}
export function execSilent(command, options = {}) {
    return execWithStdio(command, options, 'ignore');
}
// TODO: just return the childProcess
export function spawnLive(command, options = {}) {
    const child = spawnWithStdio(command, options, 'inherit');
    return () => {
        child.disconnect && child.disconnect();
    };
}
// TODO: just return the childProcess
export function spawnSilent(command, options = {}) {
    const child = spawnWithStdio(command, options, 'ignore');
    return () => {
        child.disconnect && child.disconnect();
    };
}
function execWithStdio(command, options, stdio) {
    const childProcess = spawnWithStdio(command, options, stdio);
    return new Promise((resolve, reject) => {
        childProcess.on('close', (exitCode) => {
            if (exitCode === 0) {
                resolve();
            }
            else {
                reject(new SpawnError(command, exitCode));
            }
        });
    });
}
function spawnWithStdio(command, options, stdio) {
    let commandPath;
    let commandArgs;
    let shell;
    if (typeof command === 'string') {
        commandPath = command;
        commandArgs = [];
        shell = true;
    }
    else if (Array.isArray(command)) {
        commandPath = command[0];
        commandArgs = command.slice(1);
        shell = false;
    }
    else {
        throw new Error('Invalid command type for execLive()');
    }
    return spawn(commandPath, commandArgs, {
        ...options,
        shell,
        stdio,
    });
}
export class SpawnError extends Error {
    constructor(command, exitCode) {
        super(`Exited ${JSON.stringify(command)} with error code ${exitCode}`);
        this.command = command;
        this.exitCode = exitCode;
    }
}
//# sourceMappingURL=exec.js.map