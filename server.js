require("regenerator-runtime/runtime");
const Koa = require('koa');
const { renderToNodeStream } = require('react-dom/server');
const isDev = process.env.NODE_ENV === 'development';
global.window = {};

const app = new Koa();
app.use(async (ctx, next) => {
  // 符合要求的路由才进行服务端渲染，否则走静态文件逻辑
  if (ctx.req.url === '/' || ctx.req.url === '/users' || ctx.req.url === '/count') {
    ctx.type = 'text/html';
    ctx.status = 200;
    if (isDev) {
      delete require.cache[require.resolve('./dist/umi.server')];
    }
    const serverStream = require('./dist/umi.server');
    const serverRes = await serverStream.default(ctx);
    const stream = renderToNodeStream(serverRes);
    ctx.body = stream;
  } else {
    await next();
  }
});

app.listen(7001, () => {
  console.log('server listening on 7001');
});
