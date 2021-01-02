<template lang="pug">
div(class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert")
  h1.text-2xl 404 (Not Found)
  p URI <code>{{ $route.path }}</code> could not be found.
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

