import { Plugin } from 'rollup';
export declare function generatedContentPlugin(contentMap: {
    [path: string]: string;
}): Plugin;
export interface ExteralizePathsOptions {
    paths: string[];
    extensions?: ExtensionInput;
}
export declare function externalizePathsPlugin(options: ExteralizePathsOptions): Plugin;
export interface ExternalizePkgsOptions {
    pkgNames: string[];
    moduleSideEffects?: boolean;
    forceExtension?: string;
}
export declare function externalizePkgsPlugin({ pkgNames, moduleSideEffects, forceExtension }: ExternalizePkgsOptions): Plugin;
export declare function externalizeExtensionsPlugin(extensionsInput: ExtensionInput): Plugin;
export interface RerootOptions {
    oldRoot: string;
    newRoot: string;
    extensions?: ExtensionInput;
}
export declare function rerootPlugin(options: RerootOptions): Plugin;
export declare function simpleDotAssignment(): Plugin;
export declare function minifySeparatelyPlugin(): Plugin;
export declare function massageDtsPlugin(): Plugin;
type ExtensionMap = {
    [findExtension: string]: string;
};
type ExtensionInput = string[] | ExtensionMap;
export {};
//# sourceMappingURL=rollup-plugins.d.ts.map