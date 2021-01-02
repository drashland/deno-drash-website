<script>
const title = "Creating A Client Side Rendered App (Vue)";
const subtitle = "Introduction";
const baseUri = "/advanced-tutorials/creating-a-client-side-rendered-app-vue";

export const resource = {
  paths: [
    "/advanced-tutorials/creating-a-client-side-rendered-app-vue",
    "/advanced-tutorials/creating-a-client-side-rendered-app-vue/introduction",
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
  :base_url="base_url",
  :subtitle="subtitle"
  :title="title"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="4")
  hr
  h2-hash Overview
  p In this tutorial series, you will learn how to create a simple Vue application powered by Drash. You will learn how to make a Drash server serve a <code>text/html</code> response to clients. The response will include some Vue code so that it will mount and render on the screen. Your Vue app will display Deno tweets.
  p.mt-10.text-center
    a-get-started(:href="base_url + '/#' + base_uri + '/part-1'")
  hr
  h2-hash End State
  p Below is a sample of what you will create.
  img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_vue_app/deno_tweets/part_4.png'")
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="4")
</template>
