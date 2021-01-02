<script>
const title = "Creating A Client Side Rendered App (Vue)";
const subtitle = "Part 2: Creating The Resource";
const baseUri = "/advanced-tutorials/creating-a-client-side-rendered-app-vue";

export const resource = {
    paths: ["/advanced-tutorials/creating-a-client-side-rendered-app-vue/part-2"],
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="4")
  hr
  h2-hash Before You Get Started
  p Your server will not be able to serve your HTML file until you give it the resource that can do so. In Part 1, you made your server expect a home resource. You will create this file next and will verify your server runs properly with it in the Verification section.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
      |     home_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your home resource file.
      p
        code-block(title="home_resource.ts" language="typescript")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | const decoder = new TextDecoder();
          |
          | export default class HomeResource extends Drash.Http.Resource {
          |
          |   static paths = [
          |     "/"
          |   ];
          |
          |   public GET() {
          |     try {
          |       let fileContentsRaw = Deno.readFileSync("./index.html");
          |       let template = decoder.decode(fileContentsRaw);
          |       this.response.body = template;
          |     } catch (error) {
          |       throw new Drash.Exceptions.HttpException(
          |         400,
          |         `Error reading HTML template.`
          |       );
          |     }
          |     return this.response;
          |   }
          | }
      p Your home resource will serve an HTML file and that file will display your Vue app. You will be creating this HTML file in the next tutorial part.
  hr
  h2-hash Verification
  p Stop your server (<code>ctrl + c</code>) if you still have it running from Part 1. Now that you have your resource file that your server is expecting, you can start your server and make a <code>GET</code> request to it.
  ol
    li Run your app.
      p
        code-block(title="Terminal" language="shell-session")
          | $ deno run --allow-net --allow-read app.ts
    li
      p Go to <code>localhost:1447/</code> in your browser. You should receive the following response:
      p
        code-block(:header="false")
          | Error reading HTML template.
      p This is the proper response since you have not written your <code>index.html</code> yet.
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="4")
</template>
