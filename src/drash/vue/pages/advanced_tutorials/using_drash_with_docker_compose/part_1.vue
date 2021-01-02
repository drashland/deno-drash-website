<script>
const title = "Using Drash With Docker Compose";
const subtitle = "Part 1: Creating The Source Code";
const baseUri = "/advanced-tutorials/using-drash-with-docker-compose";

export const resource = {
    paths: ["/advanced-tutorials/using-drash-with-docker-compose/part-1"],
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
      title: title,
      subtitle: subtitle,
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
  :toc="toc"
  :base_url="base_url"
  :base_uri="base_uri"
  :subtitle="subtitle"
  :title="title"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="6")
  hr
  h2-hash Before You Get Started
  p You will be creating a basic Drash server. If you haven't read the #[a( href="/#/tutorials/servers/creating-a-server") Creating A Server] section then do so before reading this tutorial.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     ▾ src/
      |         app.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your <code>src</code> directory.
      p
        code-block(title="Terminal" language="shell-session")
          | $ mkdir src
    li
      p Create your app file.
      p Your app file will contain a single resource: <code>HomeResource</code>.
      p
        code-block(title="/path/to/your/project/src/app.ts" language="typescript")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | class HomeResource extends Drash.Http.Resource {
          |
          |   static paths = [
          |     "/"
          |   ];
          |
          |   public GET() {
          |     this.response.body = 'Hello World!';
          |     return this.response;
          |   }
          | }
          |
          | const server = new Drash.Http.Server({
          |   response_output: "application/json",
          |   resources: [
          |     HomeResource
          |   ],
          | });
          |
          | server.run({
          |   hostname: "drash_app_drash",
          |   port: 1447
          | });
  hr
  h2-hash Verification
  p Verify that your app is working by running it.
  ol
    li Run your app.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net src/app.ts
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="6")
</template>
