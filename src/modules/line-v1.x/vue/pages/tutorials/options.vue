<script>
export const resource = {
  paths: ["/tutorials/options"],
  meta: {
    title: "Options",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ]
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="this.$conf.line.base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Before You Get Started
  p You didn't think we'd support subcommands without supporting options for them?
  p An option (or can be called "a flag") is an extra parameter to pass to a subcommand, that can provide extra utility.
  p Subcommands can hold as many options, but first, you would need to create your options for your subcommand.
  hr
  h2-hash Creating An Option Class
  p When you write an option, it's the form of a class and is an extension onto Line's SubcommandOption class. Here is the list of properties and methods your option classes can have and use:
  ul
    li
      p <code>name</code> - This is the name of the option. For example, say you wanted to add a <code>--say-hello</code> option to your subcommand, the property would be: <code>public name: "--say-hello"</code>.
    li
      p <code>description</code> - The description of the option. What will it do? What is the use? For example: <code>public description: "Say hello"</code>.
  hr
  h2-hash Example
  p Here is an example of how an option class would be created:
  code-block(:header="false" language="typescript")
    | class SayHelloOption extends SubcommandOption {
    |   public name = "--say-hello";
    |   public description = "Say hello";
    | }
  p Very simple!
</template>
