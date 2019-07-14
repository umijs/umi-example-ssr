
const isProd = process.env.NODE_ENV === 'production';

export default {
  ssr: true,
  manifest: {},
  disableGlobalVariables: true,
  publicPath: isProd ? '/umi-example-ssr/' : '/static/',
  base: isProd ? '/umi-example-ssr/' : '/',
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      title: {
        defaultTitle: 'my app',
      },
    }],
    ['umi-plugin-gh-pages'],
    ...(isProd ? ['@umijs/plugin-prerender'] : []),
  ],
};
