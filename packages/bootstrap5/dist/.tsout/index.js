import { createPlugin } from '@fullcalendar/core';
import { BootstrapTheme } from './BootstrapTheme.js';
import './index.css';
export default createPlugin({
    name: '<%= pkgName %>',
    themeClasses: {
        bootstrap5: BootstrapTheme,
    },
});
//# sourceMappingURL=index.js.map