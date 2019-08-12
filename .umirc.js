
const isPage = process.env.GITHUB_PAGE === 'true';

export default {
  ssr: true,
  hash: isPage,
  disableGlobalVariables: true,
  outputPath: './public',
  publicPath: isPage ? '/umi-example-ssr/' : '/public/',
  base: isPage ? '/umi-example-ssr/' : '/',
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      dynamicImport: {
        webpackChunkName: true,
      },
      title: {
        defaultTitle: 'my app',
      },
    }],
    ['umi-plugin-gh-pages'],
    ...(isPage ? ['@umijs/plugin-prerender'] : []),
  ],
};
