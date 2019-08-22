const DocumentTitle = require('react-document-title');
const isPage = process.env.GITHUB_PAGE === 'true';

const plugins = [
  ['umi-plugin-react', {
    antd: true,
    dva: true,
    dynamicImport: {
      webpackChunkName: true,
    },
    title: {
      defaultTitle: 'my app',
    },
  }],
  ['umi-plugin-gh-pages'],
  ...(isPage ? [['@umijs/plugin-prerender', {
      postProcessHtml: ($, path) => {
        const title = DocumentTitle.rewind();

        if (title) {
          $('title').html() ? $('title').text(title) : $('html head').prepend(`<title>${title}</title>`)
        }

        return $;
      }
  }]] : []),
]

export default {
  ssr: true,
  hash: isPage,
  disableGlobalVariables: true,
  outputPath: './public',
  publicPath: isPage ? '/umi-example-ssr/' : '/public/',
  base: isPage ? '/umi-example-ssr/' : '/',
  plugins,
};
