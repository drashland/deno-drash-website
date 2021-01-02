<script>
const title = "Creating A Server Side Rendered App";
const subtitle = "Part 1: Creating The Server";

export const resource = {
    paths: ["/advanced-tutorials/creating-a-server-side-rendered-app/part-1"],
    meta: {
      title,
      subtitle,
    }
}

export default {
  data() {
    return {
      base_url: this.$conf.drash.base_url,
      base_uri: "/advanced-tutorials/creating-a-server-side-rendered-app",
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
      title,
      subtitle
    };
  },
}
</script>

<template lang="pug">
page(
  :toc="toc"
  :base_url="base_url"
  :subtitle="subtitle"
  :title="title"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="3")
  hr
  h2-hash Before You Get Started
  p The server you will create in this tutorial part will handle requests to three resources. These resources will serve HTML documents.
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
        code-block(title="app.ts" language="typescript" line_highlight="3-5")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | import AboutResource from "./about_resource.ts";
          | import ContactResource from "./contact_resource.ts";
          | import HomeResource from "./home_resource.ts";
          |
          | const server = new Drash.Http.Server({
          |   response_output: "text/html",
          |   resources: [
          |     AboutResource,
          |     ContactResource,
          |     HomeResource,
          |   ]
          | });
          |
          | server.run({
          |   hostname: "localhost",
          |   port: 1447
          | });
      p When this file is run, it will load in Drash, set up your server, and start your server.
      p You will notice that there are <code>import</code> statements for your resource files (highlighted). You will be creating these files in the next tutorial part. For now, you just need to make sure your server expects and registers them.
  hr
  h2-hash Verification
  p If you run your app in its current state, you will get an error. The TypeScript compiler will throw an error stating it cannot resolve your resource files. So, before you verify that your server is working, you need to comment out the lines relevant to your resource files.
  ol
    li Comment out the code relevant to your resource file.
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="3-5,10-12")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | // import AboutResource from "./about_resource.ts";
        | // import ContactResource from "./contact_resource.ts";
        | // import HomeResource from "./home_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "text/html",
        |   resources: [
        | //    AboutResource,
        | //    ContactResource,
        | //    HomeResource,
        |   ]
        | });
        | 
        | server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });
    li Run your app.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net app.ts
    li Make a request using <code>curl</code> like below or go to <code>localhost:1447</code> in your browser.
      code-block(title="Terminal" language="shell-session")
        | $  curl localhost:1447
      p You should receive the following response:
      code-block(:header="false")
        | Not Found
      p You will receive a <code>404 Not Found</code> error because your server does not have any resources. This is expected. You will be creating your resource next.
    li Before moving on, uncomment the code you commented out.
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="3-5,10-12")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import AboutResource from "./about_resource.ts";
        | import ContactResource from "./contact_resource.ts";
        | import HomeResource from "./home_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "text/html",
        |   resources: [
        |     AboutResource,
        |     ContactResource,
        |     HomeResource,
        |   ]
        | });
        | 
        | server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="3")
</template>
