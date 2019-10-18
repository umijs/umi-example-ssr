global.window = {};
global.self = global.window;
const { join } = require('path');
const server = require('umi-server');

const render = server({
   root: join(__dirname, '..', 'dist'),
   publicPath: '/dist/',
})


module.exports = async (req, res, next) => {
   if (req.url === '/' || req.url === '/users' || req.url === '/count') {
      const { ssrHtml } = await render({
         req,
       });

      if (ssrHtml) {
        res.writeHead(200, {
         'Content-Type': 'text/html'
         })
        res.end(ssrHtml);
      }
   } else {
      res.end('404 Not Found');
   }
}
