const configsCommon = require("./configs.webpack.common.js");
const path = require("path");

module.exports = (envVars) => {
  return Object.assign(configsCommon, {
    mode: "production",
    resolve: {
      alias: {
        vue: "vue/dist/vue.min.js",
        "/assets": path.resolve(__dirname, "assets"),
        "/src": path.resolve(__dirname, "src"),
      },
    },
  });
};
