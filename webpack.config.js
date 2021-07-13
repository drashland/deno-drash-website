import TerserPlugin from "terser-webpack-plugin";
import VueLoaderPlugin from "vue-loader/lib/plugin.js";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import webpack from "webpack";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function(env) {
  return Object.assign(getEnvConfigs(env), {
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
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          test: /\.js(\?.*)?$/i,
        }),
      ],
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
      new webpack.DefinePlugin({
          'process.env': JSON.stringify(process.env)
      })
    ],
  });
};

/**
 * Get environment-specific configs.
 *
 * @param {object} env - Example:
 *
 *     {
 *       environment: "development | staging | production"
 *     }
 */
function getEnvConfigs(env) {
  if (env.development) {
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

  if (env.production || env.staging) {
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
