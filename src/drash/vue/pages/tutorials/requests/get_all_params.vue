<script>
export const resource = {
  paths: ["/tutorials/requests/get-all-params"],
  meta: {
    title: "Get All Params",
    source_code_uri: "/tutorials/requests/get-all-params"
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
        "Verification",
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
  p Drash provides a few methods to get all parameters in various scenarios, such as:
  ul
    li Get all header params
    li Get all body params
    li Get all path params
    li Get all URL query params
  code-block(:header="false" language="typescript")
    | const bodyParams = this.request.getAllBodyParams();
    | const headerParams = this.request.getAllHeaderParams();
    | const pathParams = this.request.getAllPathParams();
    | const queryParams = this.request.getAllUrlQueryParams();
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   home_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your resource file. You resource file will retrieve all header, body, query and path parameters for the request.
      code-block(title="/path/to/your/project/home_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version}}/mod.ts";
        |
        | export default class HomeResource extends Drash.Http.Resource {
        |   static paths = ["/:name/:region"];
        |
        |   public POST() {
        |     const bodyParams = this.request.getAllBodyParams();
        |     const headerParams = this.request.getAllHeaderParams();
        |     const pathParams = this.request.getAllPathParams();
        |     const queryParams = this.request.getAllUrlQueryParams();
        |     const data = {
        |       bodyParams,
        |       headerParams,
        |       pathParams,
        |       queryParams
        |     };
        |     this.response.body = data;
        |     return this.response
        |   }
        | }
    li
      p Create your app file.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version}}/mod.ts";
        | import HomeResource from "./home_resource.ts";
        |
        | const server = new Drash.Http.Server({
        |   resources: [HomeResource]
        | });
        |
        | await server.run({
        |   hostname: "localhost",
        |   port: 1337
        | });
        |
        | console.log(`Server running on http://${server.hostname}:${server.port}`);
  hr
  h2-hash Verification
  ol
    li Run your app.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net app.ts
    li
      p Using <code>curl</code> (or similar command), make a <code>POST</code> request to <code>localhost:1447/Edward/UK</code>.
      code-block(title="Terminal" language="shell-session")
        | $ curl --header "Content-Type: application/json" \
        |   --request POST \
        |   --data '{"name":"Edward","region":"UK"}' \
        |   localhost:1337/Edward/UK
      p You should receive the following response (we pretty-printed the response for you):
      code-block(:header="false" language="json")
        | {
        |   "bodyParams": {
        |     "data": {
        |       "name": "Edward",
        |       "region": "UK"
        |     },
        |     "content_type": "application/json"
        |   },
        |   "headerParams": {
        |     "host": "localhost:1337",
        |     "user-agent": "curl/7.54.0",
        |     "accept": "*/*",
        |     "content-type": "application/json",
        |     "content-length": "31"
        |   },
        |   "pathParams": {
        |     "name": "Edward",
        |     "region": "UK"
        |   }
        | }
</template>
