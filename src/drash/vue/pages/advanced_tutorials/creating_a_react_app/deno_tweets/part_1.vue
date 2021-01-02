<script>
const title = "Creating A Client Side Rendered App (React)";
const subtitle = "Part 1: Creating The Server";
const baseUri = "/advanced-tutorials/creating-a-client-side-rendered-app-react";

export const resource = {
    paths: ["/advanced-tutorials/creating-a-client-side-rendered-app-react/part-1"],
    meta: {
      title,
      subtitle,
    }
}

export default {
  data() {
    return {
      base_url: this.$conf.drash.base_url,
      base_uri: baseUri,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
      title,
      subtitle,
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="base_url",
  :base_uri="base_uri",
  :subtitle="subtitle"
  :title="title"
  :toc="toc"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="5")
  hr
  h2-hash Before You Get Started
  p The server you will create in this tutorial part will handle requests to a single resource. That resource will serve an HTML template and that HTML template will serve your React app.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your app file.
      p
        code-block(title="app.ts" language="typescript" line_highlight="3")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | import HomeResource from "./home_resource.ts";
          |
          | const server = new Drash.Http.Server({
          |   response_output: "text/html",
          |   resources: [HomeResource],
          |   directory: ".",
          |   static_paths: ["/public"]
          | });
          |
          | server.run({
          |   hostname: "localhost",
          |   port: 1447
          | });
      p When this file is run, it will load in Drash, set up your server, and start your server.
      p You will notice that there is an <code>import</code> statement for your resource file (highlighted). You will be creating this file in the next tutorial part. For now, you just need to make sure your server expects and registers it.
  hr
  h2-hash Verification
  p If you run your app in its current state, you will get an error. The TypeScript compiler will throw an error stating it cannot resolve your resource file. So, before you verify that your server is working, you need to comment out the lines relevant to your resource file.
  ol
    li
      p Comment out the code relevant to your resource file.
      p
        code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="3,7")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | // import HomeResource from "./home_resource.ts";
          |
          | const server = new Drash.Http.Server({
          |   response_output: "text/html",
          |   // resources: [HomeResource],
          |   directory: ".",
          |   static_paths: ["/public"]
          | });
          |
          | server.run({
          |   hostname: "localhost",
          |   port: 1447
          | });
    li
      p Run your app.
      p
        code-block(title="Terminal" language="shell-session")
          | $ deno run --allow-net app.ts
    li
      p Make a request using <code>curl</code> like below or go to <code>localhost:1447</code> in your browser.
      p
        code-block(title="Terminal" language="shell-session")
          | $ curl localhost:1447
      p You should receive the following response:
        code-block(:header="false")
          | Not Found
      p You will receive a <code>404 Not Found</code> error because your server does not have any resources. This is expected. You will be creating your resource next.
    li
      p Before moving on, uncomment the code you commented out.
      p
        code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="3,7")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | import HomeResource from "./home_resource.ts";
          |
          | const server = new Drash.Http.Server({
          |   response_output: "text/html",
          |   resources: [HomeResource],
          |   directory: ".",
          |   static_paths: ["/public"]
          | });
          |
          | server.run({
          |   hostname: "localhost",
          |   port: 1447
          | });
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="5")
</template>
