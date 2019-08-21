global.window = {};
global.self = global.window;
const serverRender = require('../public/umi.server');
const manifestFile = require('../public/ssr-client-mainifest.json');

const injectChunkMaps = (html, chunkMap, publicPath) => {
   const { js, css } = chunkMap;
   // filter umi.css and umi.*.css, htmlMap have includes
   const styles = css.filter(style => !/^umi\.\w+\.css$/g.test(style)) || [];
   const stylesHtml = '';
   styles.forEach(style => {
     stylesHtml += `<link rel="stylesheet" href="${publicPath}${style}" />`;
   });
   html.replace('</head>', `${stylesHtml}</head>`);
   // filter umi.js and umi.*.js
   const scripts = js.filter(script => !/^umi([.\w]*)?\.js$/g.test(script)) || [];
   const scriptsPrefetchHtml = '';
   scripts.forEach(script => {
     scriptsPrefetchHtml += `<link rel="preload" href="${publicPath}${script}" as="script"/>`;
   })

   html.replace('</head>', `${scriptsPrefetchHtml}</head>`);


   return html;
 }


module.exports = async (req, res) => {
   const { ReactDOMServer } = serverRender;
   const { htmlElement, matchPath } = await serverRender.default({
      req,
   });
   const html = '<!DOCTYPE html>' + ReactDOMServer.renderToString(htmlElement);
   const manifest = require(manifestFile);
   const chunk = manifest[matchPath];

   if (chunk) {
      html = injectChunkMaps(html, chunk, '/')
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
