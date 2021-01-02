<script>
const title = "Creating An API";
const subtitle = "Part 2: Creating The Server";
const baseUri = "/advanced-tutorials/creating-an-api";

export const resource = {
  paths: [baseUri + "/part-2"],
  meta: {
    title: title,
    subtitle: subtitle,
  }
}

export default {
  data() {
    return {
      base_url: this.$conf.drash.base_url,
      base_uri: baseUri,
      subtitle: subtitle,
      title: title,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :base_uri="base_uri"
  :subtitle="subtitle"
  :title="title"
  :toc="toc"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="4")
  hr
  h2-hash Before You Get Started
  p Now that you have your "database" records in place from Part 1, you need a server to handle requests for that data. The server you will create in this tutorial part will handle requests via the following resources:
  ul
    li
      code CoffeeResource
    li
      code TeaResource
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
      p When this file is run, it will load in Drash, set up your server, and start your server.
      p You will notice that there are <code>import</code> statements for your resource files (highlighted). You will be creating these files in the next tutorial part. For now, you just need to make sure your server expects and registers them.
      p
        code-block(title="app.ts" language="typescript" line_highlight="3-4,9-10")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | import CoffeeResource from "./coffee_resource.ts";
          | import TeaResource from "./tea_resource.ts";
          |
          | const server = new Drash.Http.Server({
          |   response_output: "application/json",
          |   resources: [
          |     CoffeeResource,
          |     TeaResource
          |   ],
          | });
          |
          | server.run({
          |   hostname: "localhost",
          |   port: 1447
          | });
  hr
  h2-hash Verification
  p If you run your app in its current state, you will get an error. The TypeScript compiler will throw an error stating it cannot resolve your resource files. So, before you verify that your server is working, you need to comment out the lines relevant to your resource files.
  ol
    li Comment out the code relevant to your resource files.
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="3-4,9-10")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        |
        | // import CoffeeResource from "./coffee_resource.ts";
        | // import TeaResource from "./tea_resource.ts";
        |
        | const server = new Drash.Http.Server({
        |   response_output: "application/json",
        |   resources: [
        |     // CoffeeResource,
        |     // TeaResource
        |   ],
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
        | $ curl localhost:1447
      p You should receive the following response:
      code-block(:header="false")
        | "Not Found"
      p You will receive a <code>404 Not Found</code> error because your server does not have any resources. This is expected. You will be creating your resources next.
    li Before moving on, uncomment the code you commented out.
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="3-4,9-10")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        |
        | import CoffeeResource from "./coffee_resource.ts";
        | import TeaResource from "./tea_resource.ts";
        |
        | const server = new Drash.Http.Server({
        |   response_output: "application/json",
        |   resources: [
        |     CoffeeResource,
        |     TeaResource
        |   ],
        | });
        |
        | server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="4")
</template>
