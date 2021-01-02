<script>
const title = "Content Negotiation";
const subtitle = "Introduction";
const baseUri = "/advanced-tutorials/content-negotiation";

export const resource = {
  paths: [
    "/advanced-tutorials/content-negotiation",
    "/advanced-tutorials/content-negotiation/introduction",
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="4")
  hr
  h2-hash Overview
  p In this tutorial series, you will learn how to implement <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation" target="_BLANK">content negotation</a> in a Drash server. You will learn how to make a Drash server serve different representations of a resource. For simplicity, the only two representations this tutorial will cover are <code>application/json</code> and <code>text/html</code>. However, this tutorial will set your resource up in a way that will allow you to add more representations.
  p The resource you will be creating is a users resource. It will contain data about users and will be able to display a single user's data as a profile card in HTML or as JSON. The client (your browser in this case) will decide what representation to receive.
  p.mt-10.text-center
    a-get-started(:href="base_url + '/#' + base_uri + '/part-1'")
  hr
  h2-hash End State
  p Below are samples of what you will create.
  p
    img(:src="'/assets/drash/img/example_code/advanced_tutorials/content_negotiation/user_profiles/part_5/verification_2.png'")
  p
    img(:src="'/assets/drash/img/example_code/advanced_tutorials/content_negotiation/user_profiles/part_4/verification_3_json.png'")
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="4")
</template>
