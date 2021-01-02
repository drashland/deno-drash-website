<script>
const title = "Using Drash With Docker Compose";
const subtitle = "Introduction";
const baseUri = "/advanced-tutorials/using-drash-with-docker-compose";

export const resource = {
  paths: [
    "/advanced-tutorials/using-drash-with-docker-compose",
    "/advanced-tutorials/using-drash-with-docker-compose/introduction",
  ],
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
      title,
      subtitle,
    };
  }
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :subtitle="subtitle"
  :title="title"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="6")
  hr
  h2-hash Overview
  p In this tutorial series, you will learn how to create a Drash server within a Docker environment. You will use the <code>docker-compose</code> command and Nginx or Apache acting as the proxy to pass connections to the Drash server. You will learn how to set up the <code>.dockerfile</code> files and configure Nginx or Apache for your Docker environment. You will also learn how to serve static <code>.js</code> and <code>.css</code> files.
  p Although this tutorial has code blocks that you can copy and paste, it is highly recommended that you read about #[a( href="https://docs.docker.com/compose/" ) Docker Compose] so you have knowledge of how it works.
  p.mt-10.text-center
    a-get-started(:href="base_url + '/#' + base_uri + '/part-1'")
  hr
  h2-hash End State
  p Below are samples of what you will create.
  img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_docker_container/docker_compose_setup/1.png'")
  img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_docker_container/docker_compose_setup/2.png'")
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="6")
</template>
