<script>
const title = "Creating A Server Side Rendered App";
const subtitle = "Part 3: Creating The HTML Files";

export const resource = {
    paths: ["/advanced-tutorials/creating-a-server-side-rendered-app/part-3"],
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
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
      title,
      subtitle,
      about_html: aboutHtml,
      contact_html: contactHtml,
      home_html: homeHtml,
    };
  },
}

const homeHtml = `<!DOCTYPE html>
<html class="h-full w-full">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
    <title>Home</title>
  </head>
  <body style="background: #f4f4f4;">
    <div style="max-width: 640px; margin: 100px auto;">
      <h1 class="text-5xl">Home</h1>
      <p class="text-xl mb-5">This is the home page!</p>
    </div>
  </body>
</html>
`;

const aboutHtml = `<!DOCTYPE html>
<html class="h-full w-full">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
    <title>About</title>
  </head>
  <body style="background: #f4f4f4;">
    <div style="max-width: 640px; margin: 100px auto;">
      <h1 class="text-5xl">About</h1>
      <p class="text-xl mb-5">This is the about page!</p>
    </div>
  </body>
</html>
`;

const contactHtml = `<!DOCTYPE html>
<html class="h-full w-full">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
    <title>Contact</title>
  </head>
  <body style="background: #f4f4f4;">
    <div style="max-width: 640px; margin: 100px auto;">
      <h1 class="text-5xl">Contact</h1>
      <p class="text-xl mb-5">This is the contact page!</p>
    </div>
  </body>
</html>
`;
</script>

<template lang="pug">
page(
  :toc="toc"
  :base_url="base_url"
  :subtitle="subtitle"
  :title="title"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="3")
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
     | ▾ /path/to/your/project/
     |     ▾ html/
     |         about.html
     |         contact.html
     |         home.html
     |     about_resource.ts
     |     app.ts
     |     contact_resource.ts
     |     home_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your Home HTML file.
      p
        code-block(title="/path/to/your/project/html/home.html" language="html")
          | {{ home_html }}
    li
      p Create your Contact HTML file.
      p
        code-block(title="/path/to/your/project/html/contact.html" language="html")
          | {{ contact_html }}
    li
      p Create your About HTML file.
      p
        code-block(title="/path/to/your/project/html/about.html" language="html")
          | {{ about_html }}
  hr
  h2-hash Verification
  p Stop your server (<code>ctrl + c</code>) if you still have it running from Part 2.
  ol
    li Run your app.
      p
        code-block(title="Terminal" language="shell-session")
          | $ deno run --allow-net --allow-read app.ts
    li
      p Go to <code>localhost:1447/</code> in your browser.
      p You should receive a response similar to the following:
      p
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_static_html_app/about_me/1.png'")
    li
      p Go to <code>localhost:1447/contact</code> in your browser.
      p You should receive a response similar to the following:
      p
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_static_html_app/about_me/2.png'")
    li
      p Go to <code>localhost:1447/about</code> in your browser.
      p You should receive a response similar to the following:
      p
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_static_html_app/about_me/3.png'")
  div-alert-finished-tutorial-series
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="3")
</template>
