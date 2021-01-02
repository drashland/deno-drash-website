<script>

const title = "Creating An API";
const subtitle = "Introduction";

export const resource = {
  paths: [
    "/advanced-tutorials/creating-an-api/",
    "/advanced-tutorials/creating-an-api/introduction",
  ],
  meta: {
    title: title,
  }
}

export default {
  data() {
    return {
      base_url: this.$conf.drash.base_url,
      base_uri: "/advanced-tutorials/creating-an-api",
      title: title,
      subtitle: subtitle,
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="4")
  hr
  h2-hash Overview
  p In this tutorial series, you will learn how to create a simple API powered by Drash. You will learn how to make a Drash server serve <code>application/json</code> responses to clients based on the clients' requests. The data your Drash server will serve will be data on coffees and teas.
  p.mt-10.text-center
    a-get-started(:href="base_url + '/#' + base_uri + '/part-1'")
  hr
  h2-hash End State
  p Below are samples of what you will create.
  p
    img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/2.png'")
  p
    img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/1.png'")
  p
    img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/3.png'")
  p
    img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/4.png'")
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="4")
</template>
