<script>
export const resource = {
  paths: ["/tutorials/front-end"],
  paths: ["/tutorials/front-end/using-jae"],
  meta: {
    title: "Front-end: Using Jae",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "About Jae",
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
  h2-hash About Jae
  p Drash has the ability to power a front-end with the help of its Tengine middleware. Specifically, its Tengine middleware and default template engine: Jae. Jae allows you to:
  ul
    li
      p Create templates with template variables
    li
      p Extend templates
    li
      p Add template partials
    li
      p Add in-template JavaScript
  p The idea behind Jae is to help you create a single page application (SPA) &mdash; allowing you to chose the front-end framework of your choice.
  p If you want to get started using Jae, follow the Tengine documentation in Drash's middleware repository <a href="https://github.com/drashland/deno-drash-middleware/tree/master/tengine">here</a>.
</template>
