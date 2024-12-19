import { MonorepoStruct } from '../../utils/monorepo-struct.js';
export interface PkgBundleStruct {
    pkgDir: string;
    pkgJson: any;
    entryConfigMap: EntryConfigMap;
    entryStructMap: {
        [entryAlias: string]: EntryStruct;
    };
    iifeGlobalsMap: IifeGlobalsMap;
    miscWatchPaths: string[];
}
export interface EntryConfig {
    generator?: string;
    iifeGenerator?: string;
    iife?: boolean;
}
export interface EntryStruct {
    entryGlob: string;
    entrySrcPath: string;
    entrySrcBase: string;
    content?: string;
}
export interface PkgJsonBuildConfig {
    exports?: EntryConfigMap;
    iifeGlobals?: IifeGlobalsMap;
}
export type EntryConfigMap = {
    [entryGlob: string]: EntryConfig;
};
export type EntryStructMap = {
    [entryAlias: string]: EntryStruct;
};
export type IifeGlobalsMap = {
    [importPath: string]: string;
};
export type GeneratorFunc = (config: {
    pkgDir: string;
    entryGlob: string;
    log: (message: string) => void;
}) => (string | {
    [entryName: string]: string;
});
export type IifeGeneratorFunc = (config: {
    pkgDir: string;
    entryAlias: string;
    log: (message: string) => void;
}) => string;
export type WatchPathsFunc = (pkgDir: string) => string[];
export declare function buildPkgBundleStruct(pkgDir: string, pkgJson: any): Promise<PkgBundleStruct>;
export declare function entryStructsToContentMap(entryStructMap: EntryStructMap): {
    [path: string]: string;
};
export declare function generateIifeContent(pkgBundleStruct: PkgBundleStruct): Promise<{
    [path: string]: string;
}>;
export declare function computeExternalPkgs(pkgBundleStruct: PkgBundleStruct): string[];
export declare function computeIifeExternalPkgs(pkgBundleStruct: PkgBundleStruct): string[];
export declare function splitPkgNames(pkgNames: string[], monorepoStruct: MonorepoStruct): {
    ourPkgNames: string[];
    theirPkgNames: string[];
};
export declare function computeOwnExternalPaths(pkgBundleStruct: PkgBundleStruct): string[];
export declare function computeOwnIifeExternalPaths(currentEntryStruct: EntryStruct, pkgBundleStruct: PkgBundleStruct): string[];
export declare function computeIifeGlobals(pkgBundleStruct: PkgBundleStruct, monorepoStruct: MonorepoStruct): IifeGlobalsMap;
//# sourceMappingURL=bundle-struct.d.ts.map