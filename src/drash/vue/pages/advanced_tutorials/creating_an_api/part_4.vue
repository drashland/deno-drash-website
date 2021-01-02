<script>
const title = "Creating An API";
const subtitle = "Part 4: Modifying The Response Schema";
const baseUri = "/advanced-tutorials/creating-an-api";

export const resource = {
  paths: [baseUri + "/part-4"],
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
  :base_url="base_url"
  :base_uri="base_uri"
  :title="title"
  :subtitle="subtitle"
  :toc="toc"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="4" :parts="4")
  hr
  h2-hash Before You Get Started
  p Currently, when clients make requests to your records, they receive the following response schema for <code>200</code> responses ...
  p
    code-block(:header="false" language="json")
      | {
      |   "id": 50,
      |   "name": "Earl Gray",
      |   "price": 4
      | }
  p ... and the following response schema for error responses (like the <code>404</code> response below) ...
  p
    code-block(:header="false" language="text")
      | "Tea with ID \"2710\" not found."
  p This is perfectly fine to some clients, but to others it does not contain enough information. Some clients want a <code>200</code> response schema like ...
  p
    code-block(:header="false" language="json")
      | {
      |   "status_code": 200,
      |   "status_text": "OK",
      |   "data": {
      |     "id": 50,
      |     "name": "Earl Gray",
      |     "price": 4
      |   },
      |   "request": {
      |     "method": "GET",
      |     "uri": "/tea/50"
      |   }
      | }
  p ... and an error response schema like ...
  p
    code-block(:header="false" language="json")
      | {
      |   "status_code": 404,
      |   "status_text": "Not Found",
      |   "data": null,
      |   "request": {
      |     "method": "GET",
      |     "uri": "/tea/2710"
      |   }
      | }
  p In this tutorial part, you will override and replace <code>Drash.Http.Response</code> so it can send a more informative response schema.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
      |     coffee.json
      |     coffee_resource.ts
      |     tea.json
      |     tea_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your <code>response.ts</code> file that will be used to override <code>Drash.Http.Response</code>.
      p
        code-block(title="response.ts" language="typescript")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | export default class Response extends Drash.Http.Response {
          |   public generateResponse(): any {
          |     let schema = {
          |       status_code: this.status_code,
          |       status_message: this.getStatusMessage(),
          |       data: this.body,
          |       request: {
          |         method: this.request.method.toUpperCase(),
          |         uri: this.request.uri
          |       }
          |     };
          |
          |     return JSON.stringify(schema);
          |   }
          | }
      p The only method you need to override is <code>generateResponse()</code>. The following methods and objects are accessible from the <code>Drash.Http.Response</code>.
      ul
        li
          code this.status_code
        li
          code this.getStatusMessage()
        li
          code this.body
        li
          code this.request
    li
      p Import your <code>response.ts</code> file and replace <code>Drash.Http.Response</code> in your <code>app.ts</code>.
      p
        code-block(title="app.ts" language="typescript" line_highlight="3,4")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | import response from "./response.ts";
          | Drash.Http.Response = response;
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
      p Now, when your Drash server runs, it will use your response class instead of its original <code>Drash.Http.Response</code>.
  hr
  h2-hash Verification
  p Now that you have your new response object that can generate a more informative response schema, you can restart your server and test it out.
  ol
    li Run your app.
      p
        code-block(title="/path/to/your/project/app.ts" language="shell-session")
          | $ deno run --allow-net --allow-read app.ts
    li Make a coffee request using <code>curl</code> like below or go to <code>localhost:1447/coffee/17</code> in your browser.
      p
        code-block(title="Terminal" language="shell-session")
          | $ curl localhost:1447/coffee/17
      p You should receive the following response (we pretty-printed the response for you):
        code-block(:header="false" language="json")
          | {
          |   "status_code": 200,
          |   "status_message": "OK",
          |   "data": {
          |     "id": 17,
          |     "name": "Light Roast: Breakfast Blend",
          |     "price": 2.25
          |   },
          |   "request": {
          |     "method": "GET",
          |     "uri": "/coffee/17"
          |   }
          | }
    li Make a bad coffee request to <code>localhost:1447/coffee/9000</code>. You should receive the following response (we pretty-printed the response for you):
      p
        code-block(:header="false" language="json")
          | {
          |   "status_code": 404,
          |   "status_message": "Not Found",
          |   "data": "Coffee with ID \"9000\" not found.",
          |   "request": {
          |     "method": "GET",
          |     "uri": "/coffee/9000"
          |   }
          | }
    li Make a tea request to <code>localhost:1447/tea/50</code>. You should receive the following response (we pretty-printed the response for you):
      p
        code-block(:header="false" language="json")
          | {
          |   "status_code": 200,
          |   "status_message": "OK",
          |   "data": {
          |     "id": 50,
          |     "name": "Earl Gray",
          |     "price": 4
          |   },
          |   "request": {
          |     "method": "GET",
          |     "uri": "/tea/50"
          |   }
          | }
    li Make a bad tea request to <code>localhost:1447/tea/1337</code>. You should receive the following response (we pretty-printed the response for you):
      p
        code-block(:header="false" language="json")
          | {
          |   "status_code": 404,
          |   "status_message": "Not Found",
          |   "data": "Tea with ID \"1337\" not found.",
          |   "request": {
          |     "method": "GET",
          |     "uri": "/tea/1337"
          |   }
          | }
  div-alert-finished-tutorial-series
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="4" :parts="4")
</template>
