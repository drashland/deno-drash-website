<script>
const title = "Creating A Client Side Rendered App (Vue)";
const subtitle = "Part 4: Creating The Vue App";
const baseUri = "/advanced-tutorials/creating-a-client-side-rendered-app-vue";

export const resource = {
    paths: ["/advanced-tutorials/creating-a-client-side-rendered-app-vue/part-4"],
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="4" :parts="4")
  hr
  h2-hash Before You Get Started
  p By now, you should have your server serving an HTML file; and that HTML file should be displaying Deno's tweets. In this next tutorial part, you will create the Vue app and assign the following Vue variables: <code>title</code> and <code>description</code>.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     ▾ public/
      |         vue_app.js
      |     app.ts
      |     home_resource.ts
      |     index.html
  hr
  h2-hash Steps
  ol
    li
      p Create your Vue app file.
      p
        code-block(title="/path/to/your/project/public/vue_app.js" language="javascript")
          | console.log("vue_app.js is now included!");
          |
          | const app = new Vue({
          |   el: '#vue_app',
          |   data: {
          |     title: "Deno",
          |     description: "A secure runtime for JavaScript and TypeScript"
          |   }
          | })
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
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_vue_app/deno_tweets/part_4.png'")
  div-alert-finished-tutorial-series
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="4" :parts="4")
</template>
