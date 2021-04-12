<script>
export const resource = {
  paths: ["/tutorials/responses/content-type"],
  meta: {
    title: "Content Type",
  }
}

const html = `<p>Hello world</p>`

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
      html: html
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
  p By default, Drash will respond with a content type based on the requests <code>Accept</code> header. If the request accepts <code>*/*</code>, the response content type will be <code>application/json</code>. If the request accepts many types, Drash will grab the first one and use that. Otherwise, the default will be <code>application/json</code>.
  p You can customise the default response content type inside your <code>server</code> instantiation, using the <code>response_output</code> config.
  p You can also explicitly set the response content type on a per request basis, using <code>this.response.headers.set()</code> inside your resource method.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts

  hr
  h2-hash Example
  ol
    li
      p Create your app file.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        |
        | class Resource extends Drash.Http.Resource {
        |   static paths = ["/"];
        |
        |   public GET() {
        |     // You can override the default content type on a per resource method basis.
        |     // With the below, this method will now respond with "text/html" being the content type.
        |     this.response.headers.set("Content-Type", "text/html");
        |     this.response.body = `{{ html }}`;
        |     return this.response
        |   }
        |
        | const server = new Drash.Http.Server({
        |   // This will be the default content type used for responses.
        |   // Without this, Drash will based the content type from the requests Accept header.
        |   response_output: "application/json",
        |   resources: [ColaResource],
        | });
        | 
        | server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });
  hr
</template>
