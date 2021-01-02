<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";

const title = "Advanced Tutorials: Introduction";

export const resource = {
  paths: [
    "/advanced-tutorials",
    "/advanced-tutorials/introduction",
  ],
  meta: {
    title: title
  }
}

export default {
  components: {
    CodeBlock,
    H2Hash,
    Page,
  },
  data() {
    return {
      base_url: this.$conf.wocket.base_url,
      title: title,
      toc: [
        "About The Advanced Tutorials",
      ],
    };
  }
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :title="title"
  :toc="toc"
)
  h2-hash About The Advanced Tutorials
  p The advanced tutorials assume you have read through the all of the tutorials in the Tutorials section. Understanding the tutorials in the Tutorials section is crucial to understanding all the moving parts in the advanced tutorials. Please make sure you meet this prerequisite before moving on to an advanced tutorial.
  p All advanced tutorials come as a series of tutorial parts. The parts are ordered in a way to help you build towards the tutorial's end state from scratch. In each part, you will see a Folder Structure End State section. That section shows you what your project's folder structure should look like by the time you finish the part you are on. In addition, there will be a Verification section (the last section of each part) to help you match your end state to the tutorial's end state.
</template>

