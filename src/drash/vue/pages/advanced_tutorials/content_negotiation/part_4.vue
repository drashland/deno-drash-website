<script>
const title = "Content Negotiation";
const subtitle = "Part 4: Handling Representations";
const baseUri = "/advanced-tutorials/content-negotiation";

export const resource = {
    paths: ["/advanced-tutorials/content-negotiation/part-4"],
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
      user_html: userHtml,
    };
  },
}

const userHtml = `<!DOCTYPE html>
<html class="h-full w-full">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
    <title>Hello World</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
</head>
<body class="h-full w-full">
    <div class="flex h-full w-full items-center justify-center">
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src="https://images.bewakoof.com/original/avengers-logos-mini-backpack-avl-essential-printed-mini-backpacks-183193-1524728878.jpg" alt="Avengers">
            <div class="px-6">
                <div class="font-bold text-xl my-6">{{ alias }}</div>
                <div class="mb-6">
                    <div class="flex my-2">
                        <div class="w-1/2">
                            <p class="text-grey-darker text-base font-bold">Name</p>
                        </div>
                        <div class="w-1/2">
                            <p class="text-grey-darker text-base">{{ name }}</p>
                        </div>
                    </div>
                    <div class="flex my-2">
                        <div class="w-1/2">
                            <p class="text-grey-darker text-base font-bold">API Key</p>
                        </div>
                        <div class="w-1/2">
                            <p class="text-grey-darker text-base">**********</p>
                        </div>
                    </div>
                    <div class="flex my-2">
                        <div class="w-1/2">
                            <p class="text-grey-darker text-base font-bold">API Secret</p>
                        </div>
                        <div class="w-1/2">
                            <p class="text-grey-darker text-base">**********</p>
                        </div>
                    </div>
                </div>
                <hr class="border-b border-gray">
            </div>
            <div class="px-6 py-4">
                <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#deno</span>
                <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#drash</span>
                <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#marvel</span>
            </div>
        </div>
    </div>
</body>
</html>
`;
</script>

<template lang="pug">
page(
  :base_url="base_url",
  :base_uri="base_uri",
  :subtitle="subtitle"
  :title="title"
  :toc="toc"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="4" :parts="4")
  hr
  h2-hash Before You Get Started
  p
    strong
      em Before diving into having your resource handle HTML representations of itself, you need to understand how the <code>Accept</code> header, <code>Content-Type</code> header, MIME types, and the <code>response_output</code> server config play their roles in Drash's request-resource-response lifecycle. So, please read the entire block below.
  div(class="mb-5 items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert")
    p Drash uses the <code>Accept</code> header to determine what representation of a resource a request wants. Clients can specify one or many content types in this header. It is up to you &mdash; the developer &mdash; to handle this header properly so that you can serve the correct content type to the client based on the request.
    p There are many ways to handle the <code>Accept</code> header in Drash. We will go over one way in this tutorial part. Other ways to handle the <code>Accept</code> header can be found in Tutorials > Misc > Content Negotiation.
    p(style="margin-bottom: 0") To ensure that your server always serves a response with the <code>Content-Type</code> header, Drash will set the response object's <code>Content-Type</code> header as the value of the <code>response_output</code> server config. If you do not set this config, then Drash will default it to <code>application/json</code>.
  p Now that your server can use your users resource to serve user data, you can have your resource change the representation (the content type) of its user data before it is sent back to the client. Drash defines content types according to the MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type" target="_BLANK">https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type</a>.
  p In this tutorial part, you will create a profile card in HTML using Tailwind CSS. When clients make requests to your users resource, they will be able to specify how they want to your data using the <code>Accept</code> header.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
      |     user.html
      |     users.json
      |     users_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Add your <code>user.html</code> file.
      p
        code-block(title="/path/to/your/project/user.html" language="html" line_highlight="14,21")
          | {{ user_html }}
      p When a request is made to your resource for the <code>text/html</code> representation of its data, this is the HTML file that will be sent as the response. After your resource reads this HTML file, it will replace the highlighted variables (<code>alias</code> and <code>name</code>) with the requested user's data. This replacement process is basically the process a template engine would perform, but in a much simpler way.
    li
      p Modify your resource by adding the highlighted code so it can generate a <code>text/html</code> representation of its data. Also, organize your code with specific response-generating methods (e.g., <code>generateHtml()</code> and <code>generateJson()</code>) for readability.
      p
        code-block(title="/path/to/your/project/users_resource.ts" language="typescript" line_highlight="13-19,40-60")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | export default class UsersResource extends Drash.Http.Resource {
          |
          |   static paths = [
          |     "/users/:id"
          |   ];
          |
          |   public GET() {
          |     let userId = this.request.getPathParam("id");
          |     let user = this.getUser(userId);
          |
          |     // Read the Accept header and check if text/html is acceptable
          |     if (this.request.accepts("text/html")) {
          |       return this.generateHtml(user);
          |     }
          |
          |     // Default to a JSON representation
          |     return this.generateJson(user);
          |   }
          |
          |   protected getUser(userId: any) {
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
          |   protected generateHtml(user: any) {
          |     this.response.headers.set("Content-Type", "text/html");
          |     try {
          |       let html = this.readFileContents("./user.html");
          |       html = html
          |         .replace(/\{\{ alias \}\}/, user.alias)
          |         .replace(/\{\{ name \}\}/, user.name);
          |       this.response.body = html;
          |       return this.response;
          |     } catch (error) {
          |       throw new Drash.Exceptions.HttpException(500, error.message);
          |     }
          |   }
          |
          |   protected generateJson(user: any) {
          |     this.response.headers.set("Content-Type", "application/json");
          |     user.api_key = "**********";
          |     user.api_secret = "**********";
          |     this.response.body = user;
          |     return this.response;
          |   }
          |
          |   protected readFileContents(file: string) {
          |     let fileContentsRaw = Deno.readFileSync(file);
          |     const decoder = new TextDecoder();
          |     let decoded = decoder.decode(fileContentsRaw);
          |     return decoded;
          |   }
          | }
      p The highlighted code will check what content type the request accepts and will make sure that the user data is sent in an acceptable format. If the request does not specify the <code>Accept</code> header, then the resource will default to serving <code>application/json</code>. You should also note that the resource &mdash; when handling content negotiation &mdash; is in charge of setting the response's <code>Content-Type</code> header properly as seen in the <code>generateHtml()</code> and <code>generateJson()</code> methods.
  hr
  h2-hash Verification
  p You now have the option to specify which content type you want to receive: <code>application/json</code> or <code>text/html</code>. Verify that your resource can serve both content types of itself.
  ol
    li
      p Run your app.
      p
        code-block(title="/path/to/your/project/app.ts" language="shell-session")
          | $ deno run --allow-net --allow-read app.ts
    li
      p Make a request to <code>localhost:1447/users/1</code> in your browser.
      p You should receive the following response:
      p
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/content_negotiation/user_profiles/part_4/verification_3.png'")
    li
      p Make a request to <code>localhost:1447/users/1</code> in Postman (or similar).
      p You should receive the following response:
      p
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/content_negotiation/user_profiles/part_4/verification_3_json.png'")
    li
      p Make a request to <code>localhost:1447/users/1</code> in Postman (or similar) with the following header:
      p
        code-block(:header="false" language="text")
          | Accept: text/html
      p You should receive the following response:
      p
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/content_negotiation/user_profiles/part_4/verification_3_html.png'")
    li
      p Make a request to <code>localhost:1447/users/1</code> in Postman (or similar) with the following header:
      p
        code-block(:header="false" language="text")
          | Accept: text/xml
      p You should receive the following response because the resource defaults to JSON responses.
      p
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/content_negotiation/user_profiles/part_4/verification_3_json.png'")
  div-alert-finished-tutorial-series
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="4" :parts="4")
</template>
