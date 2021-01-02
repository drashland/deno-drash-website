<script>
const title = "Creating A Client Side Rendered App (React)";
const subtitle = "Introduction";
const baseUri = "/advanced-tutorials/creating-a-client-side-rendered-app-react";

export const resource = {
  paths: [
    "/advanced-tutorials/creating-a-client-side-rendered-app-react",
    "/advanced-tutorials/creating-a-client-side-rendered-app-react/introduction",
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
  :base_uri="base_uri"
  :title="title"
  :subtitle="subtitle"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="5")
  hr
  h2-hash Overview
  p In this tutorial series, you will learn how to create a simple React application powered by Drash. You will learn how to make a Drash server serve a <code>text/html</code> response to clients. The contents of the response will include and render JSX code so that it will mount and render on the screen. Your React app will display Deno tweets.
  p.mt-10.text-center
    a-get-started(:href="base_url + '/#' + base_uri + '/part-1'")
  hr
  h2-hash End State
  p Below is a sample of what you will create.
  img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_react_app/deno_tweets/1.png'")
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="5")
</template>
