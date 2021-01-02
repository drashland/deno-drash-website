<script>
const title = "Creating An API";
const subtitle = "Part 3: Creating The Resources";
const baseUri = "/advanced-tutorials/creating-an-api";

export const resource = {
    paths: [baseUri + "/part-3"],
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
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
      title: title,
      subtitle: subtitle,
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="4")
  hr
  h2-hash Before You Get Started
  p Your server will not be able to handle requests for coffee and tea records until you give it resources that can send your records back to clients. In Part 2, you made your server expect a coffee and tea resource. You will create these files next and will verify your server runs properly with them in the Verification section.
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
      p Create your coffee resource file.
      p
        code-block(language="typescript" title="coffee_resource.ts")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | export default class CoffeeResource extends Drash.Http.Resource {
          |
          |   static paths = [
          |     "/coffee/:id"
          |   ];
          |
          |   public GET() {
          |     let coffeeId = this.request.getPathParam("id");
          |     this.response.body = this.getCoffee(coffeeId);
          |     return this.response;
          |   }
          |
          |   protected getCoffee(coffeeId: number) {
          |     let record = null;
          |
          |     try {
          |       let fileContentsRaw = Deno.readFileSync("./coffee.json");
          |       let decoder = new TextDecoder();
          |       let records = decoder.decode(fileContentsRaw);
          |       records = JSON.parse(records);
          |       record = records[coffeeId];
          |     } catch (error) {
          |       throw new Drash.Exceptions.HttpException(
          |         400,
          |         `Error getting coffee with ID "${coffeeId}". Error: ${error.message}.`
          |       );
          |     }
          |
          |     if (!record) {
          |       throw new Drash.Exceptions.HttpException(
          |         404,
          |         `Coffee with ID "${coffeeId}" not found.`
          |       );
          |     }
          |
          |     return record;
          |   }
          | }
      p Your coffee resource will try to match the specified coffee <code>id</code> path param to a coffee ID in your "database". If the <code>id</code> is matched, then the record will be sent as the response. If not, then an error response will be sent.
    li
      p Create your tea resource file.
        code-block(title="tea_resource.ts" language="typescript")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | export default class TeaResource extends Drash.Http.Resource {
          |
          |   static paths = [
          |     "/tea/:id"
          |   ];
          |
          |   public GET() {
          |     let teaId = this.request.getPathParam("id");
          |     this.response.body = this.getTea(teaId);
          |     return this.response;
          |   }
          |
          |   protected getTea(teaId: number) {
          |     let record = null;
          |
          |     try {
          |       let fileContentsRaw = Deno.readFileSync("./tea.json");
          |       let decoder = new TextDecoder();
          |       let records = decoder.decode(fileContentsRaw);
          |       records = JSON.parse(records);
          |       record = records[teaId];
          |     } catch (error) {
          |       throw new Drash.Exceptions.HttpException(
          |         400,
          |         `Error getting tea with ID "${teaId}". Error: ${error.message}.`
          |       );
          |     }
          |
          |     if (!record) {
          |       throw new Drash.Exceptions.HttpException(
          |         404,
          |         `Tea with ID "${teaId}" not found.`
          |       );
          |     }
          |
          |     return record;
          |   }
          | }
      p Your tea resource will try to match the specified tea <code>id</code> path param to a tea ID in your "database". If the <code>id</code> is matched, then the record will be sent as the response. If not, then an error response will be sent.
  hr
  h2-hash Verification
  p Stop your server (<code>ctrl + c</code>) if you still have it running from Part 2. Now that you have your resource files that your server is expecting, you can start your server and make <code>GET</code> requests to them.
  ol
    li
      p Run your app.
      p
        code-block(title="Terminal" language="shell-session")
          | $ deno run --allow-net --allow-read app.ts
    li
      p Make a coffee request using <code>curl</code> like below or go to <code>localhost:1447/coffee/17</code> in your browser.
      p
        code-block(title="Terminal" language="shell-session")
          | $ curl localhost:1447/coffee/17
      p You should receive the following response (we pretty-printed the response for you):
      p
        code-block(:header="false" language="json")
          | {
          |   "id": 17,
          |   "name": "Light Roast: Breakfast Blend",
          |   "price": 2.25
          | }
    li
      p Make a coffee request to <code>localhost:1447/coffee/32</code>. You should receive the following response (we pretty-printed the response for you):
      p
        code-block(:header="false" language="json")
          | {
          |   "id": 32,
          |   "name": "Medium Roast: Premium Single Origin (Sumatra)",
          |   "price": 3.5
          | }
    li
      p Make a bad coffee request to <code>localhost:1447/coffee/9000</code>. You should receive the following response (we pretty-printed the response for you):
      p
        code-block(:header="false" language="shell-session")
          | "Coffee with ID \"9000\" not found."
    li
      p Make a tea request to <code>localhost:1447/tea/50</code>. You should receive the following response (we pretty-printed the response for you):
      p
        code-block(:header="false" language="json")
          | {
          |   "id": 50,
          |   "name": "Earl Gray",
          |   "price": 4
          | }
    li
      p Make a tea request to <code>localhost:1447/tea/68</code>. You should receive the following response (we pretty-printed the response for you):
      p
        code-block(:header="false" language="json")
          | {
          |   "id": 68,
          |   "name": "Citrus Chamomile",
          |   "price": 3.5
          | }
    li
      p Make a bad tea request to <code>localhost:1447/tea/2710</code>.
      p You should receive the following response (we pretty-printed the response for you):
      p
        code-block(:header="false" language="shell-session")
          | "Tea with ID \"2710\" not found."
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="4")
</template>
