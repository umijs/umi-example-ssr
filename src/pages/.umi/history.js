// create history
const history = __IS_BROWSER ? require('umi/lib/createHistory').default({
  basename: window.routerBase,
}) : require('history/createMemoryHistory').default();
window.g_history = history;
export default history;
