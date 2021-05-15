<script>
export const resource = {
  paths: ["/tutorials/adding-options"],
  meta: {
    title: "Adding Options",
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
  p A subcommand would not be complete without options. Options (also known as "flags") can provide extra functionality to your subcommands. Line allows you to add as many options to your subcommands as you wish.
  p Simply put, options are classes (with a few required properties) that Line registers and instantiates during runtime.
  p When you write an option, it is in the form of a class and must extend Line's <code>Option</code> class. The following class members are required in your option class(es):
  ul
    li
      p <code>name</code>
      p This property is the name of the option.
    li
      p <code>description</code>
      p This property will explain to users the purpose of the option.
  p In this tutorial, you will create one option:
  ul
    li <code>LanguageOption</code>: This will be in charge of switching the language based on user input.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   subcommands.ts
    |   options.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your option class and export it.
      code-block(title="/path/to/your/project/options.ts" language="typescript")
        | import { Option } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        |
        | /**
        |  * Give the option to choose a language.
        |  */
        | export class LanguageOption extends SubcommandOption {
        |   public name = "--language";
        |
        |   public description = "Choose a language.";
        | }
    li
      p Import your option, create your subcommand using your option, and export your subcommand.
      code-block(title="/path/to/your/project/subcommands.ts" language="typescript")
        | import { Subcommand } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        | import { LanguageOption } from "./options.ts";
        |
        | /**
        |  * Greet users.
        |  */
        | export class GreetSubcommand extends Subcommand {
        |   public signature = "greet [name]";
        |
        |   public description = "Greet users.";
        |
        |   public options = [
        |     LanguageOption
        |   ];
        |
        |   public handle(): void {
        |     const name = this.getArgumentValue("name"); // Matches [name] in the signature
        |
        |     if (!name) {
        |       this.showHelp();
        |       return;
        |     }
        |
        |     // Check for the option
        |     const language = this.getOptionValue("--language");
        |
        |     // Change the functionality of the subcommand based on the option
        |     let greeting = "Hello";
        |     if (language) {
        |       switch (language.toLowerCase()) {
        |         case "french":
        |           greeting = "Bonjour";
        |           break;
        |         case "italian":
        |           greeting = "Ciao";
        |           break;
        |         case "spanish":
        |           greeting = "Hola";
        |           break;
        |         default:
        |           break;
        |       }
        |     }
        |
        |     console.log(`${greeting}, ${name}!`);
        |   }
        | }
    li
      p Import your subcommand and add them to your CLI application.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Line } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        | import { GreetSubcommand } from "./subcommands.ts";
        |
        | const cli = new Line({
        |   command: "greeter",
        |   name: "Greeter",
        |   description: "Greet users.",
        |   subcommands: [
        |     GreetSubcommand,
        |   ],
        |   version: "v1.0.0",
        | });
        |
        | cli.run();
  hr
  h2-hash Verification
  ol
    li
      p Install your CLI.
      code-block(language="shell" :header="false")
        | $ deno install --name greeter app.ts
    li
      p Run your CLI.
      code-block(language="shell" :header="false")
        | $ greeter
      p You should see the following:
      code-block(language="text" :header="false")
        | Greeter - Greet users.
        |
        | USAGE
        |
        |     greeter [option | [[subcommand] [args] [deno flags] [options]]]
        |
        | OPTIONS
        |
        |     -h, --help    Show this menu.
        |     -v, --version Show this CLI's version.
        |
        | SUBCOMMANDS
        |
        |     greet
        |         Greet users.
    li
      p Check that your <code>greet</code> subcommand has the <code>--language</code> option.
      code-block(language="shell" :header="false")
        | $ greeter greet
      p You should see the following:
      code-block(language="text" :header="false")
        | USAGE
        |
        |     greeter greet [name] [deno flags] [options]
        |
        | OPTIONS
        |
        |     --language
        |         Choose a language.
    li
      p Run the <code>greet</code> subcommand.
      code-block(language="shell" :header="false")
        | $ greeter greet John
      p You should see the following:
      code-block(language="text" :header="false")
        | Hello, John!
    li
      p Change the language using the <code>--language</code> option.
      p Try <code>french</code>.
      code-block(language="shell" :header="false")
        | $ greeter greet John --language french
      p You should see the following:
      code-block(language="text" :header="false")
        | Bonjour, John!
      p Try <code>italian</code>.
      code-block(language="shell" :header="false")
        | $ greeter greet John --language italian
      p You should see the following:
      code-block(language="text" :header="false")
        | Ciao, John!
      p Try <code>spanish</code>.
      code-block(language="shell" :header="false")
        | $ greeter greet John --language spanish
      p You should see the following:
      code-block(language="text" :header="false")
        | Hola, John!
</template>
