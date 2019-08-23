global.window = {};
global.self = global.window;
const serverRender = require('../dist/umi.server');
const manifest = require('../dist/ssr-client-mainifest');
const { injectChunkMaps } = require('./utils');


module.exports = async (req, res) => {
   const { ReactDOMServer } = serverRender;
   const { htmlElement, matchPath } = await serverRender.default({
      req,
   });
   let html = '<!DOCTYPE html>' + ReactDOMServer.renderToString(htmlElement);
   const chunk = manifest[matchPath];

   if (chunk) {
      const chunkMaps = injectChunkMaps(html, chunk, '/dist/');
      html = chunkMaps;
   }
   if (html) {
     res.writeHead(200, {
      'Content-Type': 'text/html'
      })
     res.end(html);
   }
   global.window = {};
   global.self = global.window;
   res.end('404 Not Found');
}
