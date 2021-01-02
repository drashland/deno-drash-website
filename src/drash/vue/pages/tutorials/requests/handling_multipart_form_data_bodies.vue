<script>
export const resource = {
  paths: ["/tutorials/requests/handling-multipart-bodies"],
  meta: {
    title: "Handling Multipart Bodies",
    source_code_uri: "/tutorials/requests/handling_multipart_form_data_bodies"
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
  p Drash's <code>multipart/form-data</code> parser uses Deno Standard Modules' <code><a href="https://github.com/denoland/deno/blob/master/std/mime/multipart.ts#L254" target="_BLANK">MultipartReader</a></code>.
  p Getting a value from a <code>multipart/form-data</code> request's body can be done using the following call:
  code-block(:header="false" language="typescript")
    | const file = this.request.getBodyFile("file_name");
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   ▾ uploads/
    |     my_uploaded_file.txt
    |   app.ts
    |   files_resource.ts
    |   my_file.txt
  hr
  h2-hash Steps
  ol
    li
      p Create your resource file. Your resource file will check for the <code>my_file</code> file in the request's body. If it exists, then it will write its contents to <code>outputFile</code>. If it does not exist, then it will throw a <code>400 Bad Request</code> response.
      code-block(title="/path/to/your/project/files_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class HomeResource extends Drash.Http.Resource {
        | 
        |   static paths = [
        |     "/files"
        |   ];
        | 
        |   public POST() {
        |     const decoder = new TextDecoder();
        |     const file = this.request.getBodyFile("my_file");
        | 
        |     if (!file || !file.content) {
        |       throw new Drash.Exceptions.HttpException(
        |         400,
        |         "This resource requires files to be uploaded via the request body."
        |       );
        |     }
        | 
        |     const outputFile = "./uploads/my_uploaded_file.txt";
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
      p Create your <code>my_file.txt</code> file so it can be passed in the request body.
      code-block(title="/path/to/your/project/my_file.txt" language="text")
        | Hello, world!
        |
        | I am a simple text file.
    li
      p Create your app file. The <code>memory_allocation.multipart_form_data</code> config is how much memory in megabytes you want to allow the <code>multipart/form-data</code> reader to allocate to reading files. If you do not specify this config, Drash will default to <code>10</code> megabytes.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | import FilesResource from "./files_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "text/plain",
        |   resources: [FilesResource],
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
        | $ deno run --allow-net --allow-write app.ts
    li
      p Create your <code>uploads</code> folder in your project's directory. This is where the output file will be stored. If you skip this step, you will get the following error: <code>"No such file or directory (os error 2)"</code>.
    li
      p Using <code>curl</code> (or similar command), make a <code>POST</code> request to <code>localhost:1447/files</code> and pass in <code>my_file.txt</code> in the request body. The name of the file is before <code>=@</code>. This is the name your resource will check for when trying to get the file.
      code-block(title="Terminal" language="shell-session")
        | $ curl -F "my_file=@my_file.txt" localhost:1447/files
      p You should receive the following response:
      code-block(:header="false")
        | You uploaded the following to ./uploads/my_uploaded_file.txt:
        | Hello, world!
        |
        | I am a simple text file.
    li
      p Check your <code>uploads</code> directory. You should see <code>my_uploaded_file.txt</code> with the following contents:
      code-block(title="/path/to/your/project/uploads/my_uploaded_file.txt")
        | Hello, world!
        |
        | I am a simple text file.
    li
      p Make the same request, but change the file's name to hello.
      p
        code-block(title="Terminal" language="shell-session")
          | $ curl -F "hello=@my_file.txt" localhost:1447/files
      p You should receive the following response:
      code-block(title="Terminal" :header="false")
        | This resource requires files to be uploaded via the request body.
</template>
