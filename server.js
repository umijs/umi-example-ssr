require("regenerator-runtime/runtime");
const server = require('umi-server');
const Koa = require('koa');
const detect = require('detect-port');
const { join } = require('path');
const serve = require('koa-static-router');
const isDev = process.env.NODE_ENV === 'development';

const render = server({
  root: join(__dirname, 'dist'),
  host: 'http://localhost:8000',
  publicPath: isDev ? '/' : '/dist/',
})

const app = new Koa();
app.use(serve({
  dir: './dist',
  router: '/dist/',
}));
app.use(async (ctx, next) => {
  // 符合要求的路由才进行服务端渲染，否则走静态文件逻辑
  if (ctx.request.path === '/' || ctx.request.path === '/users' || ctx.request.path === '/count') {
    ctx.type = 'text/html';
    ctx.status = 200;
    if (isDev) {
      delete require.cache[require.resolve('./dist/umi.server')];
    }
    const { ssrHtml } = await render({
      req: {
        url: ctx.request.url,
      }
    });

    ctx.body = ssrHtml;
  } else {
    ctx.status = 404;
    ctx.body = 'not found';
    await next();
  }
});

const port = 7001;

detect(port)
  .then(_port => {
    if (port == _port) {
      app.listen(_port + 1, () => {
        console.log(`server listening on ${_port + 1}`);
      });
    } else {
      app.listen(_port, () => {
        console.log(`server listening on ${_port}`);
      });
    }
  })
  .catch(err => {
    console.log(err);
  });


