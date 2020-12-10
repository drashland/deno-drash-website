module.exports = {
  apps: [
    {
      cwd: "/path/to/website",
      name: "Drash Land",
      script: "deno run --allow-net --allow-read ./drash_website_server.ts",
      watch: "true",
    },
  ]
};
