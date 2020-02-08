<script>
export const resource = {
  paths: ["/lifecycle-diagram"],
  meta: {
    title: "Lifecycle Diagram",
    source_code_uri: "/lifecycle_diagram",
  }
}

export default {
  data() {
    return {
    };
  },
}
</script>

<template lang="pug">
page()
  div.row
    div.col
      hr
      p Below is a digram of Drash's complete request-resource-response lifecycle with error handling flows.
      p
        img(:src="$conf.base_url + '/public/assets/img/drash_lifecycle_diagram.svg'")
</template>
