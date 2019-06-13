
export default {
  ssr: true,
  disableGlobalVariables: true,
  publicPath: 'http://127.0.0.1:8000/',
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      title: {
        defaultTitle: 'my app',
      },
    }],
  ],
};
