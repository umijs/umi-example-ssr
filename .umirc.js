
const isPage = process.env.GITHUB_PAGE === 'true';

export default {
  ssr: true,
  hash: isPage,
  disableGlobalVariables: true,
  publicPath: isPage ? '/umi-example-ssr/' : '/static/',
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
