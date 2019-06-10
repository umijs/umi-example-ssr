
export default {
  ssr: true,
  disableGlobalVariables: true,
  publicPath: 'http://127.0.0.1:8000/',
  plugins: [
    'umi-plugin-dva',
    ['umi-plugin-react', {
      title: {
        defaultTitle: 'my app',
      },
    }],
  ],
};
