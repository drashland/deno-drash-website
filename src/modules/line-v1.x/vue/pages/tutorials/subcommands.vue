<script>
export const resource = {
  paths: ["/tutorials/subcommands"],
  meta: {
    title: "Subcommands",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "Before You Get Started",
        "Creating A Subcommand Class",
        "Example",
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
  p A CLI wouldn't be complete without subcommands... Line offers the ability to plug in as many subcommands as you wish for your main command.
  p A subcommand is responsible for the functionality of your CLI. Using the quickstart as an example, adding "read" and "write" subcommands to your main command will allow your CLI to process those: <code>fm read</code>.
  hr
  h2-hash Creating A Subcommand Class
  p When you write a subcommand, it's the form of a class and is an extension onto Line's Subcommand class. Here is the list of properties and methods your subcommand classes can have and use:
  ul
    li
      p <code>signature</code> - This will explain how the subcommand should be used, and will be used in the <code>--help</code> option as well as telling Line how it should handle this subcommand. For example if my subcommand was to write the contents of one file to another, the signature would be: <code>public signature: "write [src] [dst]"</code> (where "dst" means destination, and "src" means source)
    li
      p <code>description</code> - The description of the subcommand, what will it do? What is the purpose? This will also be used in the <code>--help</code> option, for example: <code>public description: "Write the contents of one file to another"</code>.
    li
      p <code>options</code> - This property is what holds the options for the subcommand (can also be called "flags"). It can contain a list of options (classes that extend Line's Options class) should you wish to support options for a subcommand. For more information, please refer to the options tutorial.
    li
      p <code>handle()</code> - This method is the bread and butter of your subcommand. When you type <code>fm write file_1.ts file_2.ts</code>, this is what is invoked to handle the usage of the subcommand.
  hr
  h2-hash Example
  p Here is an example of how a subcommand class would be created:
  code-block(:header="false" language="typescript")
    | class WriteCommand extends Subcommand {
    |   public signature = "write [src] [dst]";
    |   public description = "Write the contents of one file to another";
    |   public options = [
    |     Option1, // adds a `--some-required-option` option for this command
    |   ];
    |   public handle(): void {
    |     if (this.getOptionValue("--some-required-option")) {
    |       throw new Error("The `-some-required-option` option is required"); // or can log the help option
    |     }
    |
    |     const source = this.getArgumentValue("src"); // matches the signature
    |     const destination = this.getArgumentValue("dst"); // matches the signature
    |     Deno.writeFileSync(source, destination);
    |   }
    | }
</template>
