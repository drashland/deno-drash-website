<script>
export const resource = {
  paths: ["/lifecycle-diagram"],
  meta: {
    title: "Lifecycle Diagram",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title
    };
  },
}
</script>

<template lang="pug">
page(
  :title="title"
)
  h2-hash About The Diagram
  p The diagram below shows Drash's complete request-resource-response lifecycle. The diagram starts at the top left (at <code>server.run()</code>) and works it way down towards the bottom (at <code>End request</code>).
  p Things to note:
  ul
    li Any process with a dashed border means it can throw an error. If an error is thrown, the process will immediately jump to the C connector. The C connector is in red.
    li If an error is thrown in the C connector flow, Drash will pass the error to the Deno server for further processing.
    li If an error is thrown in the <code>for await (req of server) { ... }</code> process, Drash will pass the error to the Deno server for further processing.
    li Middleware execution points are in orange.
    li Runtime middleware only executes if compile time middleware is defined at server creation.
  p You can click the diagram to enlarge it.
  p
    a(:href="'/assets/drash/img/drash_lifecycle_diagram_v1.3.0.svg'" target="_BLANK")
      img(:src="'/assets/drash/img/drash_lifecycle_diagram_v1.3.0.svg'")
</template>
