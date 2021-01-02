<template lang="pug">
div
  h1 404 (Not Found)
  p URI <code>{{ $route.path }}</code> doesn't exist.
</template>

<script>
export const resource = {
    paths: ["/404"],
    meta: {
        title: "404 (Not Found)",
        error_code: 404
    }
}

export default {
    data() {
        return {
        };
    },
}
</script>


