module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // update the HTMLWebpackPlugin to only add main chunk to index.html
      // eslint-disable-next-line no-param-reassign
      webpackConfig.plugins[0].userOptions.chunks = ["main"];

      return {
        ...webpackConfig,
        entry: {
          main: [
            env === "development" &&
              require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs,
          ].filter(Boolean),
          background: "./src/background.js",
        },
        output: {
          ...webpackConfig.output,
          filename: "static/js/[name].js",
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
      };
    },
  },
};
