<script>
export const resource = {
  paths: [
    "/tutorials/middleware/using-drash-middleware-modules"
  ],
  meta: {
    title: "Use Drash Middleware Modules",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
    };
  },
}
</script>

<template lang="pug">
page(
  :title="title"
)
  p Drash has a middleware repository that contains a collection of middleware modules. The repository contains <em>only</em> Drash-approved middleware modules. They are extensively documented and tested. Moreover, just like the tutorial pages you see on this website, there are tutorials on the repository that show you how to use each middleware module.
  div.mt-5.mb-5.bg-blue-100.border-l-4.border-teal-500.rounded-b.text-blue-900.px-4.py-3.shadow-md(role="alert")
    div.py-1
      p.font-bold Wait! Here's a note about third party dependencies!
      p.text-sm Be aware that some modules <em>may</em> use third-party dependencies whilst some will not.
  p Although Drash provides a repository of middleware modules that you can easily plug straight into your Drash application, feel free to create your own middleware modules that suit your needs. Use of the Drash-approved middleware is not required to build a great Drash application.
  p You can view the repository <a href="https://github.com/drashland/deno-drash-middleware" target="_BLANK">here</a>.
</template>
