<script>
const title = "Using Drash With Docker Compose";
const subtitle = "Part 1: Creating The Dockerfiles";
const baseUri = "/advanced-tutorials/using-drash-with-docker-compose";

export const resource = {
    paths: ["/advanced-tutorials/using-drash-with-docker-compose/part-3"],
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="6")
  hr
  h2-hash Before You Get Started
  p Now that you have your <code>docker-compose.yml</code> file set up, you now need your <code>.dockerfile</code> files (also known as <code>Dockerfile</code> files). These files will tell Docker how it should build. The <code>Dockerfile</code> files you will create in this tutorial part will be used by each container.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     ▾ .docker/
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
      p Create the Drash <code>Dockerfile</code>.
      p This file will be used by the Drash service block you added in the last tutorial part &mdash; inside of your <code>docker-compose.yml</code> file.
      p
        em
          strong Note that you can change the version of Deno to install to suit your requirements.
      code-block(title="/path/to/your/project/.docker/drash.dockerfile" language="dockerfile")
        | FROM debian:stable-slim
        |
        | RUN apt update -y
        | RUN apt install bash curl unzip -y
        |
        | RUN curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=/usr/local sh -s {{ $conf.deno.latest_version }}
        | RUN export DENO_INSTALL="/root/.local"
        | RUN export PATH="$DENO_INSTALL/bin:$PATH"
    li
      p Create the Nginx <code>Dockerfile</code>.
      p
        em If you prefer to use Apache, then skip this step and follow the next step below.
      p This file will be used by the Nginx container.
      code-block(title="/path/to/your/project/.docker/nginx.dockerfile" language="dockerfile")
        | FROM nginx:latest
        |
        | RUN apt update
        |
        | COPY ./.docker/conf/nginx.conf /etc/nginx/conf.d/default.conf
        |
        | ENTRYPOINT ["nginx"]
        | CMD ["-g", "daemon off;"]
      p You will create the configuration file for Nginx in the next tutorial part. Nginx will use the configuration file pass connections to the Drash server.
    li
      p Create the Apache <code>Dockerfile</code>.
      p This file will be used by the Apache container.
      code-block(title="/path/to/your/project/.docker/apache.dockerfile" language="dockerfile")
        | FROM httpd:2.4
        |
        | RUN apt update -y
        | COPY .docker/conf/apache.conf /usr/local/apache2/conf/demoapache.conf
        | RUN echo "\nInclude /usr/local/apache2/conf/demoapache.conf" >> /usr/local/apache2/conf/httpd.conf
      p You will create the configuration file for Apache in the next tutorial part. Apache will use the configuration file pass connections to the Drash server.
  hr
  h2-hash Verification
  p There are no verification steps for this tutorial part.
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="6")
</template>
