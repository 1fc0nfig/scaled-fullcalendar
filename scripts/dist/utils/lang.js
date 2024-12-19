export function mapProps(props, func) {
    const newProps = {};
    for (const key in props) {
        newProps[key] = func(props[key], key);
    }
    return newProps;
}
export function filterProps(props, func) {
    const newProps = {};
    for (const key in props) {
        if (func(props[key], key)) {
            newProps[key] = props[key];
        }
    }
    return newProps;
}
export function strsToProps(strs) {
    const map = {};
    for (const str of strs) {
        map[str] = true;
    }
    return map;
}
export function boolPromise(promise) {
    return promise.then(() => true, () => false);
}
export function arrayify(input) {
    return Array.isArray(input) ? input : (input == null ? [] : [input]);
}
export function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
export async function continuousAsync(workerFunc) {
    let currentRun;
    let currentCleanupFunc;
    let isDirty = false;
    let isStopped = false;
    async function run() {
        if (!isStopped) {
            if (!currentRun) {
                currentCleanupFunc && currentCleanupFunc();
                currentCleanupFunc = undefined;
                currentRun = Promise.resolve(workerFunc(run));
                currentCleanupFunc = (await currentRun) || undefined;
                currentRun = undefined;
                // had scan requests during previous run?
                if (isDirty) {
                    isDirty = false;
                    run();
                }
            }
            else {
                isDirty = true;
            }
        }
    }
    await run();
    return () => {
        isStopped = true;
        currentCleanupFunc && currentCleanupFunc();
    };
}
//# sourceMappingURL=lang.js.map