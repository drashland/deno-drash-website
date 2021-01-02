<script>
const title = "Creating A Client Side Rendered App (React)";
const subtitle = "Part 3: Creating The HTML Template";
const baseUri = "/advanced-tutorials/creating-a-client-side-rendered-app-react";

export const resource = {
    paths: ["/advanced-tutorials/creating-a-client-side-rendered-app-react/part-3"],
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
  <div id="root" style="max-width: 640px; margin: 0 auto;">
  </div>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>
</body>

<script src="/public/app.js"><\/script>
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="5")
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
      p You will notice there is a <code>&lt;script&gt;</code> tag. This points to your compiled React component that you will create in the later steps.
  hr
  h2-hash Verification
  p Stop your server (<code>ctrl + c</code>) if you still have it running from Part 2.
  p Unfortunately, if you try the run the app now and go to <code>localhost:1447/</code> in your browser, the page will error.
  p This is because all the content of the page is going to come from your React component which has not been created yet.
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="5")
</template>
