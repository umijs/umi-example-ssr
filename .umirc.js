
export default {
  ssr: true,
  manifest: {},
  disableGlobalVariables: true,
  publicPath: '/static/',
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      title: {
        defaultTitle: 'my app',
      },
    }],
  ],
};
