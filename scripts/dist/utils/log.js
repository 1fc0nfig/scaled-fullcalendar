import chalk from 'chalk';
const timeFormat = new Intl.DateTimeFormat('en', {
    timeStyle: 'medium',
});
export function pkgLog(pkgName, message) {
    log(message, chalk.green(pkgName.replace(/^@[^/]*\//, '')));
}
export function log(message, label) {
    const now = Date.now();
    const nowStr = timeFormat.format(now);
    const prefix = `[${chalk.grey(nowStr)}]`;
    const subprefix = label ? `${label}: ` : '';
    const lines = message.trimEnd().split('\n');
    for (const line of lines) {
        console.log(`${prefix} ${subprefix}${line}`);
    }
    console.log();
}
//# sourceMappingURL=log.js.map