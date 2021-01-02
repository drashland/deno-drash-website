<script>
export const resource = {
  paths: ["/tutorials/misc/adding-global-members"],
  meta: {
    title: "Adding Global Members",
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
  :base_url="this.$conf.drash.base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Before You Get Started
  p A global member is any "thing" you define the global member to be. It can be a service, an app, an array, a number, etc.
  p You can add global members to the <code>Drash.Members</code> namespace via <code>Drash.addMember()</code>.
  p Adding global members is helpful when you want to access a "thing" without having to remember where it's physically located. This prevents you from having to import like <code>import MyThing from "../path/../to/../some/../dir/my_thing.ts"</code>. Instead, you can add your "thing" as a global member (e.g., <code>Drash.addMember("MyThing", myThing);</code>) and access it like <code>Drash.Members.MyThing</code>.
  p All global members are added to the <code>Drash.Members</code> namespace.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   bootstrap.ts
    |   my_thing.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your "thing" to be added as a global member.
      code-block(title="/path/to/your/project/my_thing.ts" language="typescript")
        | export default class MyThing {
        |   public greet() {
        |     return "Hello from MyThing!";
        |   }
        | }

    li
      p Create a file that adds your "thing" as a global member.
      code-block(title="/path/to/your/project/bootstrap.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | // Register MyThing as a global member
        | import myThing from "./my_thing.ts";
        | Drash.addMember("MyThing", new myThing());

    li
      p Create your app file and have it use your global member.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | // When this file is imported, it will register MyThing as a global member
        | import "./bootstrap.ts";
        | 
        | console.log(Drash.Members.MyThing.greet());

  hr
  h2-hash Verification
  ol
    li
      P Run your app.
      code-block(title="Terminal" language="shell-session")
        | $ deno run app.ts
      p You should see the following after you have run your app:
      code-block(title="Terminal" language="shell-session")
        | Hello from MyThing!
      p As you can see, <code>app.ts</code> knows nothing about <code>MyThing</code>. All it knows is that it should be registered as a global member and that it can use it without having to import it.
</template>
