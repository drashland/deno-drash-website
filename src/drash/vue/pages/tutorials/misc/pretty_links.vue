<script>
export const resource = {
  paths: ["/tutorials/misc/pretty-links"],
  meta: {
    title: "Pretty Links",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "Before You Get Started",
        "Steps",
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
  p This tutorial assumes you have read the Servers: Serving Static Paths tutorial.
  p This tutorial solves the issue of always having to specify <code>index.html</code> at the end of a static path URI. For example, you can specify <code>/my-uri</code> instead of <code>/my-uri/index.html</code>.
  hr
  h2-hash Steps
  ol
    li
      p Create your <code>app.ts</code> file. Take note of the highlighted code. Using this config will allow you to NOT have to specify <code>index.html</code> for any static path.
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="9")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import HomeResource from "./home_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   directory: "/path/to/your/project",
        |   resources: [HomeResource],
        |   response_output: "text/html",
        |   pretty_links: true,
        |   static_paths: ["/public"]
        | });
        | 
        | server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });

</template>
