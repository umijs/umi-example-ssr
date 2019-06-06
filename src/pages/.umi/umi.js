import './polyfills';
import history from './history';

import React from 'react';
import ReactDOM from 'react-dom';
import findRoute from '/Users/chencheng/code/github.com/umijs/umi/packages/umi-build-dev/lib/findRoute.js';


// runtime plugins
const plugins = require('umi/_runtimePlugin');
window.g_plugins = plugins;
plugins.init({
  validKeys: ['patchRoutes','render','rootContainer','modifyRouteProps','onRouteChange','initialProps','dva',],
});
plugins.use(require('../../../../umi/packages/umi-plugin-dva/lib/runtime'));

const app = require('@tmp/dva')._onCreate();
window.g_app = app;
app.router(() => <div />);
app.start();

// render
let clientRender = async () => {
  window.g_isBrowser = true;
  let props = {};
  // Both support SSR and CSR
  if (window.g_useSSR) {
    // 如果开启服务端渲染则客户端组件初始化 props 使用服务端注入的数据
    props = window.g_initialData;
  } else {
    const pathname = location.pathname;
    const activeRoute = findRoute(require('@tmp/router').routes, pathname);
    if (activeRoute) {
      props = activeRoute.component.getInitialProps ? await activeRoute.component.getInitialProps() : {};
    }
  }
  const rootContainer = plugins.apply('rootContainer', {
    initialValue: React.createElement(require('./router').default, props),
  });
  ReactDOM[window.g_useSSR ? 'hydrate' : 'render'](
    rootContainer,
    document.getElementById('root'),
  );
};
const render = plugins.compose('render', { initialValue: clientRender });

// client render
if (__IS_BROWSER) {
  const moduleBeforeRendererPromises = [];

  Promise.all(moduleBeforeRendererPromises).then(() => {
    render();
  }).catch((err) => {
    window.console && window.console.error(err);
  });
}

// export server render
let serverRender;
if (!__IS_BROWSER) {
  serverRender = async (ctx) => {
    const pathname = ctx.req.url;
    history.push(pathname);
    let props = {};
    const activeRoute = findRoute(require('./router').routes, pathname) || false;
    if (activeRoute && activeRoute.component.getInitialProps) {
      props = await activeRoute.component.getInitialProps();
      props = plugins.apply('initialProps', {
         initialValue: props,
      });
    }
    const rootContainer = plugins.apply('rootContainer', {
      initialValue: React.createElement(require('./router').default, props),
    });
    return (
      <html><head>

<link rel="stylesheet" href="http://127.0.0.1:8000/umi.css" />

<meta charSet="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />

<script dangerouslySetInnerHTML={{ __html: `window.g_useSSR=true;
  window.g_initialData = ${require('/Users/chencheng/code/github.com/umijs/umi/packages/umi-build-dev/node_modules/serialize-javascript/index.js')(props)};` }} />
<script dangerouslySetInnerHTML={{ __html: `window.routerBase = "/";` }} />
</head>
<body>

<div id="root">{ rootContainer }</div>

<script src="http://127.0.0.1:8000/umi.js"></script>


</body></html>
    );
  }
}
export default __IS_BROWSER ? null : serverRender;



// hot module replacement
if (__IS_BROWSER && module.hot) {
  module.hot.accept('./router', () => {
    clientRender();
  });
}
