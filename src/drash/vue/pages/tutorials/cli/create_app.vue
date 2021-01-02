<script>

export const resource = {
  paths: [
    "/tutorials/cli/create-app"
  ],
  meta: {
    title: "Create App",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "Before You Get Started",
        "Usage",
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
  h2-hash Before You Get Started
  p The <code>create_app.ts</code> script can create a boilerplate project for you, so you can quickly get a Drash application up and running, all with one simple command.
  hr
  h2-hash Usage
  p All commands will create the recommended files and directories for your project. It will also include all the required code to start up a development server in an instant.
  ul
    li
      p Create an API boilerplate project:
      p This will create a boilerplate proejct tailored to a Drash API
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-run --allow-read --allow-write --allow-net https://deno.land/x/drash@{{ $conf.drash.latest_version }}/create_app.ts --api
    li
      p Create a Web App boilerplate project:
      p This will create a boilerplate tailored to a full web application
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-run --allow-read --allow-write --allow-net https://deno.land/x/drash@{{ $conf.drash.latest_version }}/create_app.ts --web-app
      p Options:
      ul
        li
          p Include React with the frontend
          p Adding the <code>--with-react</code> flag will include React in your Web App project, so you do not need to configure webpack or set it up yourself.
          code-block(title="Terminal" language="shell-session")
            | $ deno run --allow-run --allow-read --allow-write --allow-net https://deno.land/x/drash@{{ $conf.drash.latest_version }}/create_app.ts --web-app --with-react
        li
          p Include Vue with the frontend
          p Adding the <code>--with-vue</code> flag will will include Vue in your Web App project, so you do not need to configure webpack or set it up yourself.
          code-block(title="Terminal" language="shell-session")
            | $ deno run --allow-run --allow-read --allow-write --allow-net https://deno.land/x/drash@{{ $conf.drash.latest_version }}/create_app.ts --web-app --with-vue

</template>
