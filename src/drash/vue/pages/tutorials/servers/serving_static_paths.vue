<script>
export const resource = {
  paths: ["/tutorials/servers/serving-static-paths"],
  meta: {
    title: "Serving Static Paths",
    source_code_uri: "/tutorials/servers/serving_static_paths"
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification"
      ]
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="this.$conf.drash.base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Before You Get Started
  p In this tutorial, you will build a very simple HTML page that can serve a CSS file.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   ▾ public/
    |     style.css
    |   app.ts
    |   home_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your app file. The <code>static_paths</code> config tells your Drash server what paths on your filesystem contain static files that can be served to clients. Ultimately, your Drash server will prefix the <code>directory</code> config with your paths in your <code>static_paths</code> config. For example, your Drash server will take a request to <code>/public/assets/css/style.css</code> and resolve it to <code>{directory_config}/public/assets/css/style.css</code>.
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="6,9")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import HomeResource from "./home_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   directory: "/path/to/your/project",
        |   resources: [HomeResource],
        |   response_output: "text/html",
        |   static_paths: ["/public"]
        | });
        | 
        | server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });

    li
      p Create your <code>style.css</code> file in your static directory.
      code-block(title="/path/to/your/project/public/style.css" language="css")
        | .my-text {
        |     color: #ff0000;
        | }

    li
      p Create your resource file. Your resource file will serve HTML; and your HTML will reference <code>/public/style.css</code>.
      code-block(title="/path/to/your/project/home_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class HomeResource extends Drash.Http.Resource {
        | 
        |   static paths = ["/"];
        | 
        |   public GET() {
        |     this.response.body = `
        |     <!DOCTYPE html>
        |     <html>
        |       <head>
        |         <title>Drash</title>
        |         <link href="/public/style.css" rel="stylesheet">
        |       </head>
        |       <body>
        |         <h1 class="my-text">This is my title and it is red.</h1>
        |       </body>
        |     </html>`;
        | 
        |     return this.response;
        |   }
        | }

  hr
  h2-hash Verification
  ol
    li
      p Run your app.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net --allow-read app.ts
    li
      p Go to <code>localhost:1447</code> in your browser. You should receive the following response:
      p
        strong(style="color: #ff0000; font-family: 'Times New Roman', 'Times'") This is my title and it is red.
</template>
