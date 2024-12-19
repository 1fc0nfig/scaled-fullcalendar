import { join as joinPaths } from 'path';
export function getArchiveRootDirs(monorepoStruct) {
    const { monorepoDir, monorepoPkgJson } = monorepoStruct;
    const archiveSubtrees = monorepoPkgJson.monorepoConfig?.archiveSubtrees;
    if (archiveSubtrees) {
        return archiveSubtrees.map((subdir) => joinPaths(monorepoDir, subdir));
    }
    else {
        return [monorepoDir];
    }
}
export function refineFilterArgs(args, monorepoStruct) {
    const isAllIndex = args.indexOf('--all');
    const isAll = isAllIndex !== -1;
    if (isAll) {
        args = args.slice();
        args.splice(isAllIndex, 1);
    }
    else {
        const monorepoConfig = monorepoStruct.monorepoPkgJson.monorepoConfig || {};
        const filterSubtrees = monorepoConfig.filterSubtrees || ['.'];
        args = args.concat(filterSubtrees.map((subdir) => `--filter=${subdir}/**`));
    }
    return args;
}
//# sourceMappingURL=monorepo-config.js.map