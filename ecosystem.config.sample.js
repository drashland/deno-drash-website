module.exports = {
  apps: [
    {
      cwd: __dirname,
      name: "Drash Land",
      script: "deno run --allow-net --allow-read ./app.ts",
      watch: "true",
    },
  ],
};
