<script>
const title = "CLI: Introduction";

export const resource = {
  paths: [
    "/tutorials/cli/introduction"
  ],
  meta: {
    title: title,
  }
}

export default {
  data() {
    return {
      title: title,
      toc: [
        "Basics",
        "Commands",
      ]
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="this.$conf.drash.base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Basics
  p Drash provides a CLI to improve the Drash development experience:
  ul
    li You can create a boilerplate project of the following types:
      ul
        li React
        li Vue
        li API
        li Web Application (without a front-end framework)
  p Using the CLI is useful when you want to quickly scaffold a Drash project in a simple and easy to use way.
  hr
  h2-hash Commands
  ul
    li
      a(:href="$conf.drash.base_url + '/#/tutorials/cli/create-app'") Create App (create a boilerplate)
</template>
