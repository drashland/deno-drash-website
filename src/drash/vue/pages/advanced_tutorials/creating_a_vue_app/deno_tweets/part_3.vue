<script>
const title = "Creating A Client Side Rendered App (Vue)";
const subtitle = "Part 3: Creating The HTML Template";
const baseUri = "/advanced-tutorials/creating-a-client-side-rendered-app-vue";

export const resource = {
    paths: ["/advanced-tutorials/creating-a-client-side-rendered-app-vue/part-3"],
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
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
      title,
      subtitle,
      index_html: indexHtml,
    };
  },
}

const indexHtml = `<!DOCTYPE html>
<html class="h-full w-full">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
    <title>Deno Tweets</title>
  </head>
  <body>
    <div id="vue_app" style="max-width: 640px; margin: 0 auto;">
      <h1 class="text-5xl">{{ title }}</h1>
      <p class="text-xl mb-5">{{ description }}</p>
      <hr class="mb-5">
      <a class="twitter-timeline" href="https://twitter.com/deno_land?ref_src=twsrc%5Etfw">Tweets by deno_land</a>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>
    </div>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"><\/script>
  <script src="/public/vue_app.js"><\/script>
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="4")
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
      |     home_resource.ts
      |     index.html
  hr
  h2-hash Steps
  ol
    li
      p Create your HTML file.
      p
        code-block(title="/path/to/your/project/index.html" language="html")
          | {{ index_html }}
      p To make things easier, your HTML file comes with the embedded Twitter Timeline widget. This widget will show Deno's tweets.
      p You will notice there are two Vue template variables: <code>title</code> and <code>description</code>. You will be assigning these variables in the next tutorial part.
  hr
  h2-hash Verification
  p Stop your server (<code>ctrl + c</code>) if you still have it running from Part 2.
  ol
    li
      p Run your app.
      p
        code-block(title="Terminal" language="shell-session")
          | $ deno run --allow-net --allow-read app.ts
    li
      p Go to <code>localhost:1447/</code> in your browser. You should receive a response similar to the following:
      p
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_vue_app/deno_tweets/part_3.png'")
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="4")
</template>
