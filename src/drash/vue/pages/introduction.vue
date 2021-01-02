<script>
import Description from "../description.vue";

export const resource = {
  paths: ["/", "/introduction"],
  meta: {
    title: "Introduction",
  }
}

export default {
  components: {
    Description
  },
  data() {
    return {
    };
  },
}
</script>

<template lang="pug">
div
  introduction-header(heading="Drash" description="Drash is a REST microframework for Deno's HTTP server with zero dependencies")
  div.flex.mb-5
    a(href="https://github.com/drashland/deno-drash/releases" target="_BLANK")
      img.mr-1(alt="Latest Drash Release" src="https://img.shields.io/github/release/drashland/deno-drash.svg?color=brightgreen&label=Latest" width="auto" height="20")
    a(href="https://github.com/drashland/deno-drash/actions" target="_BLANK")
      img.mr-1(alt="Drash CI" src="https://img.shields.io/github/workflow/status/drashland/deno-drash/master?label=CI" width="auto" height="20")
    a(href="https://discord.gg/SgejNXq" target="_BLANK")
      img.mr-1(alt="Drash Land Discord" src="https://img.shields.io/badge/Chat-on%20Discord-blue")
    a(href="https://twitter.com/drash_land" target="_BLANK")
      img.mr-1(alt="Drash Land Twitter" src="https://img.shields.io/twitter/url?label=%40drash_land&style=social&url=https%3A%2F%2Ftwitter.com%2Fdrash_land" width="auto" height="20")
    a(href="https://rb.gy/vxmeed" target="_BLANK")
      img(alt="Drash YouTube" src="https://img.shields.io/badge/Tutorials-YouTube-red" width="auto" height="20")
  div
    hr
    h2-hash Drash In A Nutshell
    description
    p Want to learn more about Drash? Click #[a( href="/drash/#/about-drash") here].
  div
    hr
    h2-hash Quickstart
    ol
      li
        p Write your <code>app.ts</code> file.
        code-block(title="app.ts" language="typescript")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | class HomeResource extends Drash.Http.Resource {
          |   static paths = ["/"];
          |   public GET() {
          |     this.response.body = "Hello World!";
          |     return this.response;
          |   }
          | }
          |
          | const server = new Drash.Http.Server({
          |   response_output: "text/html",
          |   resources: [HomeResource]
          | });
          |
          | server.run({
          |   hostname: "localhost",
          |   port: 1447
          | });
      li
        p Run your <code>app.ts</code> file.
        code-block(title="Terminal" language="shell-session")
          | $ deno run --allow-net app.ts
      li
        p Make a request.
        code-block(title="Terminal" language="shell-session")
          | $ curl localhost:1447
          |
          | Hello World!
    hr
    h2-hash Importing
    div
      code-block(language="typescript" :header="false")
        | // Import a specific version of Drash
        | import { Drash } from "https://deno.land/x/drash@{tag}/mod.ts";
        |
        | // Always import the latest release
        | import { Drash } from "https://deno.land/x/drash/mod.ts";
      p Drash versions can be found <a :href="'https://github.com/drashland/deno-drash/releases'" target="_BLANK">here</a>.
    h3
      strong Mirrors
    ul
      li
        p <a href="https://nest.land/package/deno-drash" target="_BLANK">nest.land</a>
    hr
    h2-hash Features
    ul
      li
        p Zero Dependencies
      li
        p Extensively Documented
      li
        p Tutorials
      li
        p Lightweight
      li
        p Content Negotiation
      li
        p Routing
      li
        p Middleware
      li
        p Request Body Handling
</template>
