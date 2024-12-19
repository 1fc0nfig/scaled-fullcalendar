import { refineFilterArgs } from './utils/monorepo-config.js';
import { runTurboTasks } from './utils/turbo.js';
export default async function (...args) {
    const monorepoDir = this.cwd;
    const { monorepoStruct } = this;
    runTurboTasks(monorepoDir, ['lint', ...refineFilterArgs(args, monorepoStruct)]);
}
//# sourceMappingURL=lint.js.map