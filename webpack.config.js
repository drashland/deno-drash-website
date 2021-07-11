const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");

module.exports = (envVars) =>{
  return Object.assign(getEnvConfigs(envVars), {
    entry: {
      "dmm-v1.x": path.resolve(__dirname, "src/modules/dmm-v1.x/app.js"),
      "drash-v1.x": path.resolve(__dirname, "src/modules/drash-v1.x/app.js"),
      "line-v0.x": path.resolve(__dirname, "src/modules/line-v0.x/app.js"),
      "rhum-v1.x": path.resolve(__dirname, "src/modules/rhum-v1.x/app.js"),
      "sinco-v1.x": path.resolve(__dirname, "src/modules/sinco-v1.x/app.js"),
      "sinco-v2.x": path.resolve(__dirname, "src/modules/sinco-v2.x/app.js"),
      "wocket-v0.x": path.resolve(__dirname, "src/modules/wocket-v0.x/app.js"),
    },
    module: {
      rules: [
        {
          loader: "pug-plain-loader",
          test: /\.pug$/,
        },
        {
          loader: "vue-loader",
          test: /\.vue$/,
        },
        // this will apply to both plain `.js` files
        // AND `<script>` blocks in `.vue` files
        {
          loader: "babel-loader",
          test: /\.js$/,
        },
        // this will apply to both plain `.css` files
        // AND `<style>` blocks in `.vue` files
        {
          test: /(\.scss|\.css)$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader", // compiles Sass to CSS, using Node Sass by default
          ],
        },
      ],
    },
    optimization: {
      // runtimeChunk: "single",
      splitChunks: {
        name: "common",
        chunks: "all",
      },
    },
    output: {
      filename: `[name].js`,
      path: path.resolve(__dirname, "assets/bundles/"),
    },
    plugins: [
      // make sure to include the plugin!
      new VueLoaderPlugin(),
    ],
  });
}

/**
 * Get environment-specific configs.
 *
 * @param envVars {object} - Example:
 *
 *     {
 *       environment: "development | staging | production"
 *     }
 */
function getEnvConfigs(envVars) {
  if (envVars.environment == "development") {
    return {
      mode: "development",
      resolve: {
        alias: {
          vue: "vue/dist/vue.js",
          "/assets": path.resolve(__dirname, "assets"),
          "/src": path.resolve(__dirname, "src"),
        },
      },
    };
  }

  if (envVars.environment == "production" || envVars.environment == "staging") {
    return {
      mode: "production",
      resolve: {
        alias: {
          vue: "vue/dist/vue.min.js",
          "/assets": path.resolve(__dirname, "assets"),
          "/src": path.resolve(__dirname, "src"),
        },
      },
    };
  }
}
