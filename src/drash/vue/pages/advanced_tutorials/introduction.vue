<script>
const title = "Advanced Tutorials";
const subtitle = "Introduction";

export const resource = {
  paths: [
    "/advanced-tutorials",
    "/advanced-tutorials/introduction"
  ],
  meta: {
    title,
    subtitle
  }
}

export default {
  data() {
    return {
      title,
      subtitle,
    };
  },
}
</script>

<template lang="pug">
page(
  :subtitle="subtitle"
  :title="title"
)
  h2-hash About The Advanced Tutorials
  p The advanced tutorials assume you have read through the following tutorials:
  ul
    li Resources
    li Requests
    li Servers
  p Understanding the above tutorials is crucial to understanding all the moving parts in the advanced tutorials. Please make sure you understand the above tutorials before moving on to an advanced tutorial.
  p All advanced tutorials come as a series of tutorial parts. The parts are ordered in a way to help you build towards the tutorial's end state from scratch. In each part, you will see a Folder Structure End State section. That section shows you what your project's folder structure should look like by the time you finish the part you are on. In addition, there will be a Verification section (the last section of each part) to help you match your end state to the tutorial's end state.
</template>
