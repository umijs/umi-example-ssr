global.window = {};
global.self = global.window;
const serverRender = require('../public/umi.server');


module.exports = async (req, res) => {
   const { ReactDOMServer } = serverRender;
   const { htmlElement } = await serverRender.default({
      req,
   });
   const html = ReactDOMServer.renderToString(htmlElement);
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
