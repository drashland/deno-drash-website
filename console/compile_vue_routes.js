const configs = require("../configs.node.js");
const fs = require("fs");
const path = require("path");

const modules = [
  "dmm-v1.x",
  "drash-v1.x",
  "rhum-v1.x",
  "sinco-v1.x",
  "wocket-v0.x",
  "wocket-v1.x"
];

modules.forEach((moduleAndVersion) => {
  const moduleName = moduleAndVersion.split("-")[0];
  const moduleVersion = moduleAndVersion.split("-")[1];

  const directory = configs.root_directory + "/src/modules/" + moduleName +
    "-" + moduleVersion + "/vue/pages";
  const outFile = configs.root_directory + "/src/modules/" + moduleName + "-" +
    moduleVersion + "/compiled_vue_routes.js";

  console.log(`Compiling ${outFile} for ${moduleName}-${moduleVersion}`);

  let importString = ``;
  let exportString = `
  export default [
  `;
  let count = 0;

  function walk(directory) {
    const files = fs.readdirSync(directory);
    for (let index in files) {
      const file = files[index];
      const filepath = path.join(directory, file);
      const stats = fs.statSync(filepath);
      const filenameWithoutExtension = path.basename(filepath).split(".")[0];
      const filepathKebabCase =
        path.basename(filepath).replace("_", "-").split(".")[0];
      if (stats.isDirectory()) {
        walk(filepath);
      } else if (stats.isFile()) {
        importString += `
  import * as ${filenameWithoutExtension}_${count} from "/${filepath}";`;
        exportString += `  ${filenameWithoutExtension}_${count},\n`;
      }
      count += 1;
    }
  }

  walk(directory);
  exportString += `];`;

  fs.writeFileSync(outFile, importString + exportString);
});
