// Webpack
let conf = process.env.conf; // This variable comes from webpack.config.js under `plugins`

// Vue
import Vue from "vue";

// Vue
import VueRouter from "vue-router";
import Client from "/public/assets/js/axios.js";

// Vendor
import MarkdownIt from "markdown-it";
window.markdownIt = new MarkdownIt();
