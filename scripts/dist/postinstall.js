import { writeTsconfigs } from './utils/monorepo-ts.js';
import { writeDistPkgJsons } from './json.js';
export default async function () {
    await Promise.all([
        writeTsconfigs(this.monorepoStruct),
        writeDistPkgJsons(this.monorepoStruct, true, // isDev
        true),
    ]);
}
//# sourceMappingURL=postinstall.js.map