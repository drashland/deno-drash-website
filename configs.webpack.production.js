/**
 * This webpack config file handles building a specific version of docs for a
 * specific module. For example, if I want to build Drash docs v1.3.0, then I
 * would use this file and not the default webpack.config.js file.
 */

const configsCommon = require("./configs.webpack.common.js");
const path = require("path");

module.exports = (envVars) => {
  const module = envVars.branch.split("-")[0];
  const version = envVars.branch.split("-")[1];

  return Object.assign(configsCommon, {
    entry: {
      [module]: path.resolve(
        __dirname,
        `src/${module}/app.js`,
      ),
    },
    mode: "production",
    output: {
      path: path.resolve(__dirname, "assets/bundles/"),
      filename: `[name].${version}.js`,
    },
    resolve: {
      alias: {
        vue: "vue/dist/vue.min.js",
        "/common": path.resolve(__dirname, "assets/common"),
        [`/${module}`]: path.resolve(__dirname, `src/${module}`),
      },
    },
  });
};
