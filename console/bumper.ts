const res = await fetch(
  "https://raw.githubusercontent.com/denoland/deno_website2/master/versions.json",
);
const versions: {
  std: string[];
  cli: string[];
  cli_to_std: {
    [key: string]: string;
  };
} = await res.json();
const latestDenoVersion = versions.cli[0];
const latestStdVersion = versions.std[0];
const rawConfigContent = new TextDecoder().decode(
  Deno.readFileSync("./configs.json"),
);
const config = JSON.parse(rawConfigContent);
config.deno.latest_version = latestDenoVersion;
config.deno_std.latest_version = latestStdVersion;
Deno.writeFileSync(
  "./configs.json",
  new TextEncoder().encode(JSON.stringify(config, null, 2)),
);
