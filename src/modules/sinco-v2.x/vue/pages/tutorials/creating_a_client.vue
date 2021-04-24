<script>
const title = "Creating a Client";

export const resource = {
  paths: [
    "/tutorials/creating-a-client",
  ],
  meta: {
    title: title
  }
}

export default {
  components: {
  },
  data() {
    return {
      base_url: this.$conf.sinco.base_url,
      title: title,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
    };
  }
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Before You Get Started
  p Sinco is a browser and automation testing tool. Sinco currently supports the following browsers:
  ul
    li Chrome (or other Chromium based browsers)
    li Firefox (or other Gecko Engine based browsers)
  p Sinco does this by creating a headless browser and connecting to the remote devtools protocol. Sinco uses the latest version of Chrome and Firefox when creating a client.
  p To create and build a client, Sinco provides a <code>.buildFor()</code> method, where you can specify which browser to build for, and any extra configuration options you wish to supply, to customise how the client is setup.
  p Both the Chrome and Firefox clients provide the exact same API, so you could create a Chrome client, write 100 lines of code using this API, and only need to change one line of code to switch to Firefox.
  p In this tutorial, you will:
  ul
    li Create both a headless browser instance for Chrome and Firefox; and
    li Customise the build options;
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |     app.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your file.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { buildFor } from "https://deno.land/x/sinco@{{ $conf.sinco.latest_version }}/mod.ts";
        |
        | // `buildFor()` takes two arguments:
        | //   1. The browser name to build for. This can be "firefox" or "chrome". This is required.
        | //   2. Options for creating the client. This is optional, and can be left out. This can be any or all of the following:
        | //     - The hostname of the system that the client was created on. For you, this is your host machine. Defaults to "0.0.0.0" for MacOS and Linux, and "127.0.0.1" for Windows.
        | //     - The port for the headless browser process to start a debugger server on. This is only important if you wish to occupy a different port than the default one. Defaults to 9293.
        | //     - The default URL to navigate to when the browser starts. Defaults to "https://chromestatus.com" for a Chrome browser, and "https://developer.mozilla.org" for a Firefox browser
        | //     - The full path to the browser binary. Useful when the binary is installed in a different location or using an alternate browser of the same underlying engine. A good example would be Brave Browser (Chromium based).
        | //     e.g. await buildFor("chrome", {
        | //            hostname: "localhost",
        | //            debuggerPort: 9292,
        | //            defaultUrl: "http://drash.land",
        | //            binaryPath: "C:\\Users\\Nishchay\\brave\\brave.exe"
        | //          });
        | const Chrome = await buildFor("chrome");
        | const Firefox = await buildFor("firefox");
        | // Both clients provide the exact same API
        | await Chrome.goTo("https://drash.land");
        | await Firefox.goTo("https://drash.land");
        | // Now you close the connections and processes, as you are done here
        | await Chrome.done();
        | await Firefox.done();
      p Here you are going to create your headless browser instance for Firefox and Chrome. Note that you wouldn't need to create both at the same time, you are only doing that here for demonstration purposes.
      p When building a client for Firefox, note that it will create a temporary profile that will be used, due to this, a Firefox client requires a <code>--allow-write=$TMPDIR</code> flag
  hr
  h2-hash Verification
  ol
    li
      p Run your file.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-run --allow-net --allow-write=$TMPDIR --allow-read app.ts
</template>

