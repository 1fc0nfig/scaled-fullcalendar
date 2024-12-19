import { hashValuesToArray, collectFromHash } from './object.js';
/*
TODO: somehow infer OtherArgs from masterCallback?
TODO: infer RefType from masterCallback if provided
*/
export class RefMap {
    constructor(masterCallback) {
        this.masterCallback = masterCallback;
        this.currentMap = {};
        this.depths = {};
        this.callbackMap = {};
        this.handleValue = (val, key) => {
            let { depths, currentMap } = this;
            let removed = false;
            let added = false;
            if (val !== null) {
                // for bug... ACTUALLY: can probably do away with this now that callers don't share numeric indices anymore
                removed = (key in currentMap);
                currentMap[key] = val;
                depths[key] = (depths[key] || 0) + 1;
                added = true;
            }
            else {
                depths[key] -= 1;
                if (!depths[key]) {
                    delete currentMap[key];
                    delete this.callbackMap[key];
                    removed = true;
                }
            }
            if (this.masterCallback) {
                if (removed) {
                    this.masterCallback(null, String(key));
                }
                if (added) {
                    this.masterCallback(val, String(key));
                }
            }
        };
    }
    createRef(key) {
        let refCallback = this.callbackMap[key];
        if (!refCallback) {
            refCallback = this.callbackMap[key] = (val) => {
                this.handleValue(val, String(key));
            };
        }
        return refCallback;
    }
    // TODO: check callers that don't care about order. should use getAll instead
    // NOTE: this method has become less valuable now that we are encouraged to map order by some other index
    // TODO: provide ONE array-export function, buildArray, which fails on non-numeric indexes. caller can manipulate and "collect"
    collect(startIndex, endIndex, step) {
        return collectFromHash(this.currentMap, startIndex, endIndex, step);
    }
    getAll() {
        return hashValuesToArray(this.currentMap);
    }
}
//# sourceMappingURL=RefMap.js.map