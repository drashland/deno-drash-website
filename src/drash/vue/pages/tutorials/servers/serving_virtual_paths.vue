<script>
export const resource = {
  paths: ["/tutorials/servers/serving-virtual-paths"],
  meta: {
    title: "Serving Virtual Paths",
    source_code_uri: "/tutorials/servers/serving_virtual_paths"
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
  p In this tutorial, you will build a very simple HTML page that can serve a CSS file that is defined at a virtual path. A virtual path is a path that maps to a physical path on your server and has its own set of permissions. With virtual paths, you can keep your project's folder structure flexible and secure.
  p Virtual paths are enabled by defining them in the <code>static_paths</code> server config.
  p Using virtual paths requires the <code>directory</code> server config. This config helps the server map virtual paths to physical paths on your server.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   ▾ back_end/
    |     app.ts
    |     home_resource.ts
    |   ▾ front_end/
    |     style.css
  hr
  h2-hash Steps
  ol
    li
      p Create your app file. You will be using the <code>static_paths</code> config to define your virtual paths. Also, you will define the <code>directory</code> config to help your server map virtual paths to physical paths.
      div.mt-5.mb-5.bg-blue-100.border-l-4.border-teal-500.rounded-b.text-blue-900.px-4.py-3.shadow-md(role="alert")
        div.py-1
          p.font-bold Wait! Please read this before continuing!
          p.text-sm Your <code class="bg-transparent text-blue-900">directory</code> config SHOULD NOT HAVE a trailing slash and your physical paths SHOULD HAVE a leading slash. If you do not set this up properly, then your server will not map virtual paths to physical paths correctly.
      p In the example code block below, you are defining a virtual path of <code>/assets</code> to the physical path of <code>/front_end</code> (the key is the virtual path and the value is the physical path). The physical path must be <em>relative</em> to the directory you specify in the <code>directory</code> config.
      code-block(title="/path/to/your/project/back_end/app.ts" language="typescript" line_highlight="6,10")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import HomeResource from "./home_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   directory: "/path/to/your/project",
        |   resources: [HomeResource],
        |   response_output: "text/html",
        |   static_paths: {
        |     "/assets": "/front_end", // The physical path needs to be relative to your directory config
        |   }
        | });
        | 
        | server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });
    li
      p Create your <code>style.css</code> file in the physical path's location.
      code-block(title="/path/to/your/project/front_end/style.css" language="css")
        | .my-text {
        |     color: #ff0000;
        | }
    li
      p Create your resource file. Your resource file will serve HTML; and your HTML will reference <code>/assets/style.css</code> &mdash; the virtual path.
      code-block(title="/path/to/your/project/back_end/home_resource.ts" language="typescript")
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
        |         <link href="/assets/style.css" rel="stylesheet">
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
