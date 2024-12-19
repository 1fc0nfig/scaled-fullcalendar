export function untilSigInt() {
    return new Promise((resolve) => {
        process.once('SIGINT', () => {
            resolve();
        });
    });
}
//# sourceMappingURL=process.js.map