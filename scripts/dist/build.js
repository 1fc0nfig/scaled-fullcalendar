import { writeMonorepoArchives } from './archive.js';
import { runTurboTasks } from './utils/turbo.js';
import { refineFilterArgs } from './utils/monorepo-config.js';
export default async function (...args) {
    const monorepoDir = this.cwd;
    const { monorepoStruct } = this;
    await runTurboTasks(monorepoDir, ['build', ...refineFilterArgs(args, monorepoStruct)]);
    await writeMonorepoArchives(monorepoStruct);
}
//# sourceMappingURL=build.js.map