import { NativeFormatter } from './formatting-native.js';
import { CmdFormatter } from './formatting-cmd.js';
import { FuncFormatter } from './formatting-func.js';
export function createFormatter(input) {
    if (typeof input === 'object' && input) { // non-null object
        return new NativeFormatter(input);
    }
    if (typeof input === 'string') {
        return new CmdFormatter(input);
    }
    if (typeof input === 'function') {
        return new FuncFormatter(input);
    }
    return null;
}
//# sourceMappingURL=formatting.js.map