<script>
const title = "Content Negotiation";
const subtitle = "Part 3: Creatin The Resource";
const baseUri = "/advanced-tutorials/content-negotiation";

export const resource = {
    paths: ["/advanced-tutorials/content-negotiation/part-3"],
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="4")
  hr
  h2-hash Before You Get Started
  p Your server will not be able to handle requests for your user records until you give it a resource that grants clients access to your user records. In Part 2, you made your server expect the <code>users_resource.ts</code> file. You will create this file next and make sure your server runs properly with it in the Verification section.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
      |     users.json
      |     users_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your users resource file.
      p
        code-block(title="/path/to/your/project/users_resource.ts" language="typescript")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | export default class UsersResource extends Drash.Http.Resource {
          |
          |   static paths = [
          |     "/users/:id",
          |   ];
          |
          |   public GET() {
          |     let userId = this.request.getPathParam("id");
          |     this.response.body = this.getUser(userId);
          |     return this.response;
          |   }
          |
          |   protected getUser(userId) {
          |     let user = null;
          |
          |     try {
          |       let users = this.readFileContents("./users.json");
          |       users = JSON.parse(users);
          |       user = users[userId];
          |     } catch (error) {
          |       throw new Drash.Exceptions.HttpException(400, `Error getting user with ID "${userId}". Error: ${error.message}.`);
          |     }
          |
          |     if (!user) {
          |       throw new Drash.Exceptions.HttpException(404, `User with ID "${userId}" not found.`);
          |     }
          |
          |     return user;
          |   }
          |
          |   protected readFileContents(file: string) {
          |     let fileContentsRaw = Deno.readFileSync(file);
          |     const decoder = new TextDecoder();
          |     let decoded = decoder.decode(fileContentsRaw);
          |     return decoded;
          |   }
          | }
      p Your resource will only handle <code>GET</code> requests at the following URI:
      ul
        li
          code /users/:id
      p When a <code>GET</code> request is made to the above URIs, your resource will handle the request by:
      ol
        li Checking if an <code>id</code> path param was specified in the URI (e.g., if the request was to <code>/users/1</code>, then <code>1</code> would be the <code>id</code>).
        li Using the <code>id</code> path param to match it to a user's ID in your user records; and
        ul
          li setting the user's record in the body of the response if the <code>id</code> path param is matched; or
          li throwing a <code>404 Not Found</code> error with <code>User not found.</code> as the response body if the <code>id</code> path param is not matched.
        li Sending the response back to the server object for further processing back to the client that made the request.
  hr
  h2-hash Verification
  p Stop your server (<code>ctrl + c</code>) if you still have it running from Part 2. Now that you have the resource file that your server is expecting, you can start your server and make a <code>GET</code> request to one of your resource's URIs.
  ol
    li Run your app.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net --allow-read app.ts
    li Make a request using <code>curl</code> like below or go to <code>localhost:1447/users/1</code> in your browser.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/users/1
      p You should receive the following response (we pretty-printed the response for you):
      code-block(:header="false" language="json")
        | {
        |     "id": 1,
        |     "alias": "Captain America",
        |     "name": "Steve Rogers",
        |     "api_key": "46096ec9-5bf9-4978-b77b-07018dc32a74",
        |     "api_secret": "1b64d3ac-7e19-4018-ab99-29f50e097f4b"
        | }
    li Make another request.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/users/2
      p You should receive the following response (we pretty-printed the response for you):
      code-block(:header="false" language="json")
        | {
        |     "id": 2,
        |     "alias": "Black Widow",
        |     "name": "Natasha Romanoff",
        |     "api_key": "3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42",
        |     "api_secret": "e5b11faa-629f-4255-bf3a-ee736dc9468d"
        | }
    li Make a bad request.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/users/4
      p You should receive the following response (we pretty-printed the response for you):
      code-block(:header="false" language="text")
        | "User with ID \"4\" not found."
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="4")
</template>
