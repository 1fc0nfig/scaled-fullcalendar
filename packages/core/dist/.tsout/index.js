import './index.css';
export { Calendar } from './Calendar.js';
export * from './api/structs.js';
export { formatDate, formatRange } from './formatting-api.js';
export { createPlugin } from './plugin-system.js';
export { sliceEvents } from './View.js';
export { JsonRequestError } from './util/requestJson.js';
export { globalLocales } from './global-locales.js';
export { globalPlugins } from './global-plugins.js';
export const version = '<%= pkgVersion %>';
//# sourceMappingURL=index.js.map