<script>
import H2Hash from "/assets/common/vue/h2_hash.vue";
import Page from "/assets/common/vue/page.vue";
import CodeBlock from "/assets/common/vue/code_block.vue";
import Breadcrumbs from "/assets/common/vue/breadcrumbs.vue";
import AGetStarted from "/assets/common/vue/a_get_started.vue";

const title = "Creating A Chat App";
const subtitle = "Introduction";

export const resource = {
  paths: [
    "/advanced-tutorials/creating-a-chat-app",
    "/advanced-tutorials/creating-a-chat-app/introduction",
  ],
  meta: {
    title: title
  }
}

export default {
  components: {
    AGetStarted,
    Breadcrumbs,
    Page,
    H2Hash,
  },
  data() {
    return {
      base_url: this.$conf.wocket.base_url + "/#",
      base_uri: "/advanced-tutorials/creating-a-chat-app",
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
  breadcrumbs(:base_url="base_url + base_uri" :part="-1" :parts="3")
  hr
  h2-hash Overview
  p In this tutorial series, you will learn how to create a simple chat app powered by Wocket. You will learn how to make a Wocket server handle packet messages between multiple clients.
  p.mt-10.text-center
    a-get-started(:href="base_url + base_uri + '/part-1'")
  hr
  h2-hash End State
  p Below is an example of what you will create.
  p
    img(src="/assets/wocket-v0.x/img/creating_a_chat_app/verification_1.png")
  hr
  breadcrumbs(:base_url="base_url + base_uri" :part="-1" :parts="3")
</template>

