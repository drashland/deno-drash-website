<script>
const title = "Using Drash With Docker Compose";
const subtitle = "Part 6: (Optional) Linking JavaScripts and Stylesheets";
const baseUri = "/advanced-tutorials/using-drash-with-docker-compose";

export const resource = {
    paths: ["/advanced-tutorials/using-drash-with-docker-compose/part-6"],
    meta: {
      title: title,
      subtitle: subtitle,
    }
}

export default {
  data() {
    return {
      base_url: this.$conf.drash.base_url,
      base_uri: baseUri,
      title: title,
      subtitle: subtitle,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
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
    <link rel="stylesheet" href="index.css">
    <script src="index.js"></\script>
    <title>Home</title>
</head>
<body>
<div>
    <h1 class="text-5xl">Home</h1>
    <p class="text-xl mb-5">This is the home page!</p>
</div>
</body>
</html>`;
</script>

<template lang="pug">
page(
  :toc="toc"
  :base_url="base_url"
  :base_uri="base_uri"
  :subtitle="subtitle"
  :title="title"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="6" :parts="6")
  hr
  h2-hash Before You Get Started
  p Now that you have a working Docker environment, you can try linking client-side assets.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     ▾ .docker/
      |         ▾ conf/
      |             apache.conf
      |             nginx.conf
      |         apache.dockerfile
      |         drash.dockerfile
      |         nginx.dockerfile
      |     ▾ src/
      |         app.ts
      |         index.html
      |         index.js
      |         index.css
      |     docker-compose.yml
  hr
  h2-hash Steps
  ol
    li
      p Modify the content response type in your Drash server configs and update the <code>GET</code> request method.
      p
        code-block(title="/path/to/your/project/src/app.ts" language="typescript" line_highlight="10-14,19")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          |
          | class HomeResource extends Drash.Http.Resource {
          |
          |   static paths = [
          |     "/"
          |   ];
          |
          |   public GET() {
          |     let fileContents = Deno.readFileSync("./index.html")
          |     const decoder = new TextDecoder();
          |     let template = decoder.decode(fileContents);
          |     this.response.body = template;
          |     return this.response;
          |   }
          | }
          |
          | const server = new Drash.Http.Server({
          |   response_output: "text/html",
          |   resources: [
          |   HomeResource
          |   ],
          | });
          |
          | server.run({
          |   hostname: "drash_app_drash",
          |   port: 1447
          | });
    li
      p Add the <code>--allow-read</code> flag in your <code>docker-compose.yml</code> file.
      p
        code-block(title="/path/to/your/project/docker-compose.yml" language="yml" line_highlight="9")
          | version: '3'
          |
          | services:
          |
          |  ...
          |
          |  drash:
          |    ...
          |    command: bash -c "deno run --allow-net --allow-read app.ts"
          |    ...
    li
      p Create your HTML file.
      p
        code-block(title="/path/to/your/project/src/index.html" language="html")
          | {{ index_html }}
    li
      p Create your CSS file.
      p
        code-block(title="/path/to/your/project/src/index.css" language="css")
          | h1, p {
          |     color: blue;
          | }
    li
      p Create your JS file.
      p
        code-block(title="/path/to/your/project/src/index.js" language="javascript")
          | document.addEventListener("DOMContentLoaded", function() {
          |   const p = document.querySelector('p')
          |   p.innerText += ' Hello From The JavaScript!'
          | });
    li
      p Update your Nginx configuration.
      p You only need to do this if you are using Nginx as your reverse proxy server.
      p Any request for a <code>.js</code> or <code>.css</code> file (e.g., <code>index.js</code>) will pass through this location block. This will make Nginx look for the requested file in the specified directory.
      p
        code-block(title="/path/to/your/project/.docker/conf/nginx.conf" language="nginx" line_highlight="3-5")
          | server {
          |     listen 80;
          |     location ~ \.(css|js) {
          |       root /var/www/src;
          |     }
          |     location / {
          |       proxy_http_version 1.1;
          |       proxy_set_header Upgrade $http_upgrade;
          |       proxy_set_header Connection 'upgrade';
          |       proxy_set_header Host $host;
          |       proxy_set_header Origin "";
          |       proxy_pass http://drash_app_drash:1447;
          |     }
          | }
    li
      p Update your Apache configuration.
      p You only need to do this if you are using Apache as your reverse proxy server.
      p These new configuration lines will make sure any requests for a <code>.js</code> or a <code>.css</code> file will not be passed to your Drash server and will instead be handled by your Apache server.
      p You should note that the below does allow Apache to access the files as it is required for when a request for the JavaScripts or StyleSheets come in, but is very insecure as it is allowing full access to your source code. Ideally, you would place your assets in a <code>/public</code> directory and modify the below to match this. That way you would only allow your public files to be accessible and you would link your files in your HTML like so: <code>/public/index.css</code>.
      p
        code-block(title="/path/to/your/project/.docker/conf/apache.conf" language="apacheconf")
          | &lt;VirtualHost *:80&gt;
          |     DocumentRoot /var/www/src
          |     <Directory /var/www/src/>
          |           AllowOverride All
          |           Require all granted
          |           Allow from all
          |     </Directory>
          |     ProxyPassMatch ^(.(?!.*\.css$|.*\.js))*$ http://drash_app_drash:1447/
          | &lt;/VirtualHost&gt;
  hr
  h2-hash Verification
  ol
    li
      p Build docker again. This will update the containers <code>Nginx</code> or <code>Apache</code> configuration file and also restart your server to register the new response type.
      p
        code-block(title="Terminal" language="shell-session")
          | $ docker-compose build
    li
      p Start docker.
      p
        code-block(title="Terminal" language="shell-session")
          | $ docker-compose up -d
    li
      p Go to <code>localhost:8080</code> in your browser and you should see the following:
      p
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_docker_container/docker_compose_setup/2.png'")
  div-alert-finished-tutorial-series
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="6" :parts="6")
</template>
