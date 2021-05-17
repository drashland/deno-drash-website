<script>
const title = "Creating An Advanced CLI";
const subtitle = "Introduction";
const baseUri = "/advanced-tutorials/creating-an-advanced-cli";

export const resource = {
  paths: [
    "/advanced-tutorials/creating-an-advanced-cli",
    "/advanced-tutorials/creating-an-advanced-cli/introduction",
  ],
  meta: {
    title,
    subtitle,
  }
}

export default {
  data() {
    return {
      base_url: this.$conf.line.base_url,
      base_uri: baseUri,
      title,
      subtitle,
    };
  }
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :base_uri="base_uri"
  :title="title"
  :subtitle="subtitle"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="3")
  hr
  h2-hash Overview
  p In this tutorial series, you will learn how to create a CLI using Line. You will learn how to create your main command, create your subcommands that give your CLI functionality, and add an option to one of your subcommands. Alongside this, you will understand how your CLI will handle your help menus for your subcommands.
  p The CLI you will be creating will be a file manager. It will be able to:
  ul
    li Read files
    li Write files
    li Copy files
    li Delete files
  p.mt-10.text-center
    a-get-started(:href="base_url + '/#' + base_uri + '/part-1'")
  hr
  h2-hash End State
  p Below is a sample of what you will create.
  code-block(language="text" :header="false")
    | File Manager - Read, write, copy, and delete files.
    |
    | USAGE
    |
    |     fm [option | [[subcommand] [args] [deno flags] [options]]]
    |
    | OPTIONS
    |
    |     -h, --help    Show this menu.
    |     -v, --version Show this CLI's version.
    |
    | SUBCOMMANDS
    |
    |     copy
    |         Copy a file from one location to another.
    |     delete
    |         Delete a file.
    |     read
    |         Read a file.
    |     write
    |         Write text to a file.
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="3")
</template>
