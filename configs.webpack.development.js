const configsCommon = require("./configs.webpack.common.js");
const path = require("path");

module.exports = (envVars) => {
  return Object.assign(configsCommon, {
    entry: {
      "dmm-v1.x": path.resolve(__dirname, "src/modules/dmm-v1.x/app.js"),
      "drash-v1.x": path.resolve(__dirname, "src/modules/drash-v1.x/app.js"),
      "rhum-v1.x": path.resolve(__dirname, "src/modules/rhum-v1.x/app.js"),
      "sinco-v1.x": path.resolve(__dirname, "src/modules/sinco-v1.x/app.js"),
      "wocket-v0.x": path.resolve(__dirname, "src/modules/wocket-v0.x/app.js"),
      "sinco-v2.x": path.resolve(__dirname, "src/modules/sinco-v2.x/app.js"),
    },
    mode: "development",
    output: {
      path: path.resolve(__dirname, "assets/bundles/"),
      filename: `[name].js`,
    },
    resolve: {
      alias: {
        vue: "vue/dist/vue.js",
        "/assets": path.resolve(__dirname, "assets"),
        "/src": path.resolve(__dirname, "src"),
      },
    },
  });
};
