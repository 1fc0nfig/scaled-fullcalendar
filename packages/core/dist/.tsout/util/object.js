import { isMaybeObjectsEqual } from '../options.js';
const { hasOwnProperty } = Object.prototype;
// Merges an array of objects into a single object.
// The second argument allows for an array of property names who's object values will be merged together.
export function mergeProps(propObjs, complexPropsMap) {
    let dest = {};
    if (complexPropsMap) {
        for (let name in complexPropsMap) {
            if (complexPropsMap[name] === isMaybeObjectsEqual) { // implies that it's object-mergeable
                let complexObjs = [];
                // collect the trailing object values, stopping when a non-object is discovered
                for (let i = propObjs.length - 1; i >= 0; i -= 1) {
                    let val = propObjs[i][name];
                    if (typeof val === 'object' && val) { // non-null object
                        complexObjs.unshift(val);
                    }
                    else if (val !== undefined) {
                        dest[name] = val; // if there were no objects, this value will be used
                        break;
                    }
                }
                // if the trailing values were objects, use the merged value
                if (complexObjs.length) {
                    dest[name] = mergeProps(complexObjs);
                }
            }
        }
    }
    // copy values into the destination, going from last to first
    for (let i = propObjs.length - 1; i >= 0; i -= 1) {
        let props = propObjs[i];
        for (let name in props) {
            if (!(name in dest)) { // if already assigned by previous props or complex props, don't reassign
                dest[name] = props[name];
            }
        }
    }
    return dest;
}
export function filterHash(hash, func) {
    let filtered = {};
    for (let key in hash) {
        if (func(hash[key], key)) {
            filtered[key] = hash[key];
        }
    }
    return filtered;
}
export function mapHash(hash, func) {
    let newHash = {};
    for (let key in hash) {
        newHash[key] = func(hash[key], key);
    }
    return newHash;
}
export function arrayToHash(a) {
    let hash = {};
    for (let item of a) {
        hash[item] = true;
    }
    return hash;
}
export function buildHashFromArray(a, func) {
    let hash = {};
    for (let i = 0; i < a.length; i += 1) {
        let tuple = func(a[i], i);
        hash[tuple[0]] = tuple[1];
    }
    return hash;
}
// TODO: reassess browser support
// https://caniuse.com/?search=object.values
export function hashValuesToArray(obj) {
    let a = [];
    for (let key in obj) {
        a.push(obj[key]);
    }
    return a;
}
export function isPropsEqual(obj0, obj1) {
    if (obj0 === obj1) {
        return true;
    }
    for (let key in obj0) {
        if (hasOwnProperty.call(obj0, key)) {
            if (!(key in obj1)) {
                return false;
            }
        }
    }
    for (let key in obj1) {
        if (hasOwnProperty.call(obj1, key)) {
            if (obj0[key] !== obj1[key]) {
                return false;
            }
        }
    }
    return true;
}
const HANDLER_RE = /^on[A-Z]/;
export function isNonHandlerPropsEqual(obj0, obj1) {
    const keys = getUnequalProps(obj0, obj1);
    for (let key of keys) {
        if (!HANDLER_RE.test(key)) {
            return false;
        }
    }
    return true;
}
export function getUnequalProps(obj0, obj1) {
    let keys = [];
    for (let key in obj0) {
        if (hasOwnProperty.call(obj0, key)) {
            if (!(key in obj1)) {
                keys.push(key);
            }
        }
    }
    for (let key in obj1) {
        if (hasOwnProperty.call(obj1, key)) {
            if (obj0[key] !== obj1[key]) {
                keys.push(key);
            }
        }
    }
    return keys;
}
export function compareObjs(oldProps, newProps, equalityFuncs = {}) {
    if (oldProps === newProps) {
        return true;
    }
    for (let key in newProps) {
        if (key in oldProps && isObjValsEqual(oldProps[key], newProps[key], equalityFuncs[key])) {
            // equal
        }
        else {
            return false;
        }
    }
    // check for props that were omitted in the new
    for (let key in oldProps) {
        if (!(key in newProps)) {
            return false;
        }
    }
    return true;
}
/*
assumed "true" equality for handler names like "onReceiveSomething"
*/
function isObjValsEqual(val0, val1, comparator) {
    if (val0 === val1 || comparator === true) {
        return true;
    }
    if (comparator) {
        return comparator(val0, val1);
    }
    return false;
}
export function collectFromHash(hash, startIndex = 0, endIndex, step = 1) {
    let res = [];
    if (endIndex == null) {
        endIndex = Object.keys(hash).length;
    }
    for (let i = startIndex; i < endIndex; i += step) {
        let val = hash[i];
        if (val !== undefined) { // will disregard undefined for sparse arrays
            res.push(val);
        }
    }
    return res;
}
//# sourceMappingURL=object.js.map