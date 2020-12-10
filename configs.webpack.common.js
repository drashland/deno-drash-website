// The purpose of this file is to DRY code in the development and production
// webpack config files. They share the same configs when it comes rules,
// optimzations, and plugins.
//
// Store any common configs between configs.webpack.development.js and
// configs.webpack.production.js in this file.

const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
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
