module.exports = {
  apps: [
    {
      cwd: __dirname,
      name: "Drash Land",
      script: "deno run --allow-net --allow-read ./app.ts",
      watch: "true",
      out_file: "/dev/null",
      error_file: "/dev/null"
    },
  ],
};
