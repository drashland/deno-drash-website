<script>
export const resource = {
  paths: ["/tutorials/requests/handling-forms-and-file-uploads"],
  meta: {
    title: "Handling Forms And File Uploads",
  }
}

const public_index_html =`<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <form>
      <input name="username" type="text">
      <input type="file" name="profile-picture">
      <button id="submit" type="button">Submit</button>
    </form>
    <script>
      window.addEventListener("DOMContentLoaded", () => {
        document.getElementById("submit").addEventListener("click", async () => {
          const form = document.querySelector("form");
          await fetch("http://localhost:1447/profile", {
            method:  "POST",
            body: new FormData(form)
          });
        });
      });
    <\/script>
  </body>
</html>`

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
      public_index_html
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
  p Drash provides simple methods to handle requests with form data to get the data from those forms.
  p Getting a file from a form can be done using the following call:
  code-block(:header="false" language="typescript")
    | const file = this.request.getBodyFile("file_name");
  p In this tutorial, you will be able to go to:
  ul
    li go to your browser;
    li upload a file to a form; and
    li send that form to your server
  p Your server will save that file.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   ▾ public/
    |     index.html
    |   app.ts
    |   profile_resource.ts
    |   user_1_pic.png
  hr
  h2-hash Steps
  ol
    li
      p Create your resource file. Your resource file will check for the <code>profile-picture</code> file in the request's body. If it exists, then it will write its contents to <code>outputFile</code>. If it does not exist, then it will throw a <code>400 Bad Request</code> response.
      code-block(title="/path/to/your/project/profile_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class ProfileResource extends Drash.Http.Resource {
        | 
        |   static paths = [
        |     "/profile"
        |   ];
        |
        |   public GET() {
        |     const htmlFilePath = "./public/index.html";
        |     const rawHtmlContents = Deno.readFileSync(htmlFilePath);
        |     const decodedHtmlContents = new TextDecoder().decode(rawHtmlContents);
        |     this.response.body = decodedHtmlContents;
        |     return this.response
        |   }
        | 
        |   public POST() {
        |     const decoder = new TextDecoder();
        |     const username = this.request.getBodyParam("username")
        |     const file = this.request.getBodyFile("profile-picture");
        |
        |     console.log(username);
        |     console.log(file);
        | 
        |     if (!file || !file.content) {
        |       throw new Drash.Exceptions.HttpException(
        |         400,
        |         "This resource requires files to be uploaded via the request body."
        |       );
        |     }
        | 
        |     const outputFile = "./user_1_pic.png";
        | 
        |     Deno.writeFileSync(outputFile, file.content);
        | 
        |     this.response.body = `You uploaded the following to ${outputFile}: `
        |       + `\n${decoder.decode(file.content)}`;
        | 
        |     return this.response;
        |   }
        | 
        | }
    li
      p Create your <code>public/index.html</code> file so you can fill out a form and send it in the request to your server.
      code-block(title="/path/to/your/project/public/index.html" language="html")
        | {{ public_index_html }}
    li
      p Create your app file. The <code>memory_allocation.multipart_form_data</code> config is how much memory in megabytes you want to allow the <code>multipart/form-data</code> reader to allocate to reading files. If you do not specify this config, Drash will default to <code>10</code> megabytes.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | import ProfileResource from "./profile_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "text/html",
        |   resources: [ProfileResource],
        |   memory_allocation: {
        |     multipart_form_data: 128
        |   },
        | });
        | 
        | server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });
        | 
        | console.log(`Server running on ${server.hostname}:${server.port}`)
  hr
  h2-hash Verification
  ol
    li
      p Run your app.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net --allow-write --allow-read app.ts
    li
      p Go to <code>http://localhost:1447/profile</code> in your browser, fill in the form (where the username is "Drashland") and press the "Submit" button. Feel free to select any file, preferably an image as this tutorial is for saving a profile, and the profile holds a username and profile picture.
      p You should receive the following response in your terminal (we have pretty printed it for you):
      code-block(:header="false")
        | Drashland
        | {
        |   filename: "...",
        |   type: "image/...",
        |   content: ...,
        |   size: ...
        | }
    li
      p Check your root directory. You should see a new <code>user_1_pic.png</code> file, that should be the exact same image as the one oyu uploaded
</template>
