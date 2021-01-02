/**
 * This webpack config file handles building a specific version of docs for a
 * specific module. For example, if I want to build Drash docs v1.3.0, then I
 * would use this file and not the default webpack.config.js file.
 */

const VueLoaderPlugin = require("vue-loader/lib/plugin");

const webpackConfigsCommon = {
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-plain-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: "babel-loader",
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
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
  ]
};
const path = require("path");
const configs = require("./configs.node.js")

module.exports = (envVars) => {
  const module = envVars.module;
  const environment = envVars.environment || "production"

  console.log(
    `Building webpack bundle...
Mode: ${environment} (JS code will not be minified)
Bundle: ${module}.${configs[module].versions[0]}.js`);

  return Object.assign(webpackConfigsCommon, {
    entry: {
      [module]: path.resolve(
        __dirname,
        `src/${module}/app.js`,
      ),
    },
    mode: environment,
    output: {
      path: path.resolve(__dirname, "assets/bundles/"),
      filename: `[name].${configs[module].versions[0]}.js`,
    },
    resolve: {
      alias: {
        vue: environment === "production" ? "vue/dist/vue.min.js" : "vue/dist/vue.js",
        "/common": path.resolve(__dirname, "assets/common"),
        [`/${module}`]: path.resolve(__dirname, `src/${module}`),
      },
    },
  });
};
