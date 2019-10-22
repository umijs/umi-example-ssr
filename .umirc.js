const DocumentTitle = require('react-document-title');
const isPage = process.env.GITHUB_PAGE === 'true';

const plugins = [
  ['umi-plugin-react', {
    antd: true,
    dva: true,
    scripts: [
      { src: 'https://www.googletagmanager.com/gtag/js?id=UA-81288209-1', async: "async" },
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-81288209-1');
      `
    ],
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
  ssr: {
    disableExternal: true,
  },
  hash: process.env.NODE_ENV === 'production',
  outputPath: './dist',
  publicPath: isPage ? '/umi-example-ssr/' : '/dist/',
  base: isPage ? '/umi-example-ssr/' : '/',
  plugins,
  chainWebpack(config, { webpack }) {
    if (process.env.NODE_ENV === 'development') {
      config.output.publicPath('http://localhost:8000/');
    }
  },
};
