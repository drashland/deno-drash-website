import fs from "fs";

const moduleToUpdate = process.argv[3];
const releaseVersion = process.argv[5].split("release-")[1];

// update version in config
updateConfigs();

///////////////////////////////////////////////////////////////////////////////
// FILE MARKER - FUNCTIONS ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function updateConfigs() {
  const contents = fs.readFileSync("./configs.sample.js").toString("utf-8");
  const jsonString = contents
    .replace("export const configs = ", "")
    .replace("};", "}");

  const configs = JSON.parse(jsonString);

  configs[moduleToUpdate].latest_version = releaseVersion;

  if (configs[moduleToUpdate].latest_url_deno_land) {
    configs[moduleToUpdate].latest_url_deno_land = configs[moduleToUpdate]
      .latest_url_deno_land.replace(/v.+\//, releaseVersion + "/");
  }

  if (configs[moduleToUpdate].latest_url_nest_land) {
    configs[moduleToUpdate].latest_url_nest_land = configs[moduleToUpdate]
      .latest_url_nest_land.replace(/v.+\//, releaseVersion + "/");
  }

  if (
    configs[moduleToUpdate].versions && configs[moduleToUpdate].versions.length
  ) {
    configs[moduleToUpdate].versions.sort().reverse();
  }

  fs.writeFileSync(
    "./configs.sample.js",
    `export const configs = ${JSON.stringify(configs, null, 2)};\n`,
  );
}
