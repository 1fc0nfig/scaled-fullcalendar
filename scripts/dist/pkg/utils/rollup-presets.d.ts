import { RollupOptions } from 'rollup';
import { MonorepoStruct } from '../../utils/monorepo-struct.js';
import { PkgBundleStruct } from './bundle-struct.js';
export declare function buildEsmOptions(pkgBundleStruct: PkgBundleStruct, monorepoStruct: MonorepoStruct, sourcemap: boolean): RollupOptions;
export declare function buildCjsOptions(pkgBundleStruct: PkgBundleStruct, monorepoStruct: MonorepoStruct, sourcemap: boolean): RollupOptions;
export declare function buildIifeOptions(pkgBundleStruct: PkgBundleStruct, monorepoStruct: MonorepoStruct, minify: boolean, sourcemap: boolean): Promise<RollupOptions[]>;
export declare function buildDtsOptions(pkgBundleStruct: PkgBundleStruct): RollupOptions;
//# sourceMappingURL=rollup-presets.d.ts.map