<script>
const title = "Creating A Server Side Rendered App";
const subtitle = "Introduction";
const baseUri = "/advanced-tutorials/creating-a-server-side-rendered-app";

export const resource = {
  paths: [
    "/advanced-tutorials/creating-a-server-side-rendered-app/",
    "/advanced-tutorials/creating-a-server-side-rendered-app/introduction",
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="3")
  hr
  h2-hash Overview
  p In this tutorial series, you will learn how to create a simple static HTML app powered by Drash &mdash; where the HTML is rendered by the server. You will learn how to make a Drash server serve <code>text/html</code> responses to clients. The responses will include server-rendered HTML.
  p.mt-10.text-center
    a-get-started(:href="base_url + '/#' + base_uri + '/part-1'")
  hr
  h2-hash End State
  p Below are samples of what you will create.
  p
    img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_static_html_app/about_me/1.png'")
  p
    img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_static_html_app/about_me/2.png'")
  p
    img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_static_html_app/about_me/3.png'")
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="3")
</template>
