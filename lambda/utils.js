exports.injectChunkMaps = (html, chunkMap, publicPath) => {
   const { js, css } = chunkMap;
   // filter umi.css and umi.*.css, htmlMap have includes
   const styles = css.filter(style => !/^umi\.\w+\.css$/g.test(style)) || [];

   let stylesHtml = '';
   styles.forEach(style => {
     stylesHtml += `<link rel="stylesheet" href="${publicPath}${style}" />`;
   });

   html = html.replace('</head>', `${stylesHtml}</head>`);
   // filter umi.js and umi.*.js
   const scripts = js.filter(script => !/^umi([.\w]*)?\.js$/g.test(script)) || [];
   let scriptsPrefetchHtml = '';
   scripts.forEach(script => {
     scriptsPrefetchHtml += `<link rel="preload" href="${publicPath}${script}" as="script"/>`;
   })

   html = html.replace('</head>', `${scriptsPrefetchHtml}</head>`);

   return html;
 }
