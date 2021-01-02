<script>
const title = "Using Drash With Docker Compose";
const subtitle = "Part 5: Starting The Environment";
const baseUri = "/advanced-tutorials/using-drash-with-docker-compose";

export const resource = {
    paths: ["/advanced-tutorials/using-drash-with-docker-compose/part-5"],
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="5" :parts="6")
  hr
  h2-hash Before You Get Started
  p Now that you have your configuration set up for the containers, you can now build and start your Docker environment.
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
      p Build the containers. This could take up to a few minutes.
      code-block(title="Terminal" language="shell-session")
        | $ docker-compose build
  hr
  h2-hash Verification
  ol
    li
      p Start Docker. Running without the <code>-d</code> option will allow you to see all output of the container and Drash server.
      p
        code-block(title="Terminal" language="shell-session")
          | $ docker-compose up
    li
      p Make a request using <code>curl</code> like below or go to <code>localhost:8080</code> in your browser.
      p
        code-block(title="Terminal" language="shell-session")
          | $ curl localhost:8080
      p You should receive the following response:
      p
        code-block(:header="false")
          | "Hello World!"
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="5" :parts="6")
</template>
