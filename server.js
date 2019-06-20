require("regenerator-runtime/runtime");
const Koa = require('koa');
const { join } = require('path');
const serve = require('koa-static-router');
const { renderToNodeStream } = require('react-dom/server');
const isDev = process.env.NODE_ENV === 'development';

const app = new Koa();
app.use(serve({
  dir: './dist',
  router: '/static/',
}));
app.use(async (ctx, next) => {
  // 符合要求的路由才进行服务端渲染，否则走静态文件逻辑
  if (ctx.req.url === '/' || ctx.req.url === '/users' || ctx.req.url === '/count') {
    ctx.type = 'text/html';
    ctx.status = 200;
    // memo leak
    global.window = {};
    global.self = global.window;
    if (isDev) {
      delete require.cache[require.resolve('./dist/umi.server')];
    }
    const serverRender = require('./dist/umi.server');
    const { ReactDOMServer } = serverRender;

    const { htmlElement } = await serverRender.default(ctx);
    const stream = ReactDOMServer.renderToNodeStream(htmlElement);
    ctx.body = stream;
  } else {
    await next();
  }
});



app.listen(7001, () => {
  console.log('server listening on 7001');
});
