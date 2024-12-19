export interface PkgAnalysis {
    metaRootDir: string;
    pkgDir: string;
    isBundle: boolean;
    isTests: boolean;
}
export declare function analyzePkg(pkgDir: string): PkgAnalysis;
//# sourceMappingURL=pkg-analysis.d.ts.map