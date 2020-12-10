// The purpose of this file is to make the configs.js file compatible with node.
// Since we use Deno and Node, we need a way to have a single config file that
// works for both platforms. This file allows us to do that.
//
// Basically, we are reading the config.js file (used by our Deno side), and
// making it parsable as JSON. This allows webpack (used by our Node side) to
// import the configs properly via a require() statement.

const fs = require("fs");

const contents = fs.readFileSync("./configs.js")
  .toString("utf-8")
  .replace("export const configs = ", "")
  .replace("};", "}");

const configs = JSON.parse(contents);

module.exports = configs;
