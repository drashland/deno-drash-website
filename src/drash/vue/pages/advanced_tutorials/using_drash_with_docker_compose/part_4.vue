<script>
const title = "Using Drash With Docker Compose";
const subtitle = "Part 4: Creating The Proxy Server";
const baseUri = "/advanced-tutorials/using-drash-with-docker-compose";

export const resource = {
    paths: ["/advanced-tutorials/using-drash-with-docker-compose/part-4"],
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
    };
  },
}
</script>

<template lang="pug">
page(
  :toc="toc"
  :base_url="base_url"
  :base_uri="base_uri"
  :subtitle="subtitle"
  :title="title"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="4" :parts="6")
  hr
  h2-hash Before You Get Started
  p Now that you have your <code>Dockerfile</code> files set up for the containers, you now need to create the configuration file for your selected proxy server. If you are using Nginx, then you will create an Nginx configuration file. If you are using Apache, then you will create an Apache configuration file.
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
      |     docker-compose.yml
  hr
  h2-hash Steps
  ol
    li
      p Create your Nginx configuration file.
      p
        em If you are using Apache as your proxy server, then skip this step and follow the next step below.
      p This file is to configure Nginx to make it act as the proxy server.
      code-block(title="/path/to/your/project/.docker/conf/nginx.conf" language="nginx")
        | server {
        |   listen 80;
        |   location / {
        |     proxy_http_version 1.1;
        |     proxy_set_header Upgrade $http_upgrade;
        |     proxy_set_header Connection 'upgrade';
        |     proxy_set_header Host $host;
        |     proxy_set_header Origin "";
        |     proxy_pass http://drash_app_drash:1447;
        |   }
        | }
      p Any HTTP request will be routed to the Drash server.
    li
      p Create your Apache configuration file.
      p This file will make Apache act as a reverse proxy server, passing requests to the Drash server
      code-block(title="/path/to/your/project/.docker/conf/apache.conf" language="apacheconf")
        | LoadModule proxy_module /usr/local/apache2/modules/mod_proxy.so
        | LoadModule proxy_http_module modules/mod_proxy_http.so
        |
        | ServerName localhost
        |
        | &lt;VirtualHost *:80&gt;
        |   ProxyPass / http://drash_app_drash:1447/
        | &lt;/VirtualHost&gt;
  hr
  h2-hash Verification
  p There are no verification steps for this tutorial part.
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="4" :parts="6")
</template>
