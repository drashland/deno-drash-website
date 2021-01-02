<script>
const title = "Creating A Server Side Rendered App";
const subtitle = "Part 2: Creating The Resources";

export const resource = {
    paths: ["/advanced-tutorials/creating-a-server-side-rendered-app/part-2"],
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="3")
  hr
  h2-hash Before You Get Started
  p Your server will not be able to serve HTML until you give it the resources that can do so. In Part 1, you made your server expect three resources. You will create these files next and will verify your server runs properly with them in the Verification section.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     about_resource.ts
      |     app.ts
      |     contact_resource.ts
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
          |       let fileContentsRaw = Deno.readFileSync("./html/home.html");
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
      p Your home resource will serve an HTML file with the following text: This is the home page!
    li
      p Create your contact resource file.
      p
        code-block(title="contact_resource.ts" language="typescript")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | const decoder = new TextDecoder();
          |
          | export default class ContactResource extends Drash.Http.Resource {
          |
          |   static paths = [
          |     "/contact"
          |   ];
          |
          |   public GET() {
          |     try {
          |       let fileContentsRaw = Deno.readFileSync("./html/contact.html");
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
      p Your contact resource will serve an HTML file with the following text: This is the contact page!
    li
      p Create your about resource file.
      p
        code-block(title="about_resource.ts" language="typescript")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | const decoder = new TextDecoder();
          |
          | export default class AboutResource extends Drash.Http.Resource {
          |
          |   static paths = [
          |     "/about"
          |   ];
          |
          |   public GET() {
          |     try {
          |       let fileContentsRaw = Deno.readFileSync("./html/about.html");
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
      p Your about resource will serve an HTML file with the following text: This is the about page!
  hr
  h2-hash Verification
  p Stop your server (<code>ctrl + c</code>) if you still have it running from Part 1. Now that you have your resource files that your server is expecting, you can start your server and make a <code>GET</code> requests to them.
  ol
    li Run your app.
      p
        code-block(title="Terminal" language="shell-session")
          | $ deno run --allow-net --allow-read app.ts
    li Go to <code>localhost:1447/</code> in your browser.
      p You should receive the following response for all of your resources:
      p
        code-block(:header="false")
          | Error reading HTML template.
      p This is the proper response since you have not written your HTML files yet.
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="3")
</template>
