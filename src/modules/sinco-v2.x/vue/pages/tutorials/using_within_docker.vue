<script>
const title = "Using Within Docker";

export const resource = {
  paths: [
    "/tutorials/using-within-docker",
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
  p Sinco provides support for running your tests inside Docker. It only requires just over half a dozen lines inside a dockerfile to install the chrome-driver and you should be ready to go.
  p Other than that, there are no other changes required, and the rest of Sinco's documentation still applies.
  P The ability to run your Browser tests from within a docker container is very useful, because (as containers can be networked together), you could go to your website, test your <code>/register</code> page works when creating a user, and then clean up (delete the user) from your database - whether that's importing your 'User model' and deleting it manually.
  p In this tutorial, you will:
  ul
    li Create a docker container, that installs Deno and chrome-driver; and
    li Create a headless browser instance from within Docker;
    li Go to a page;
    li Assert that you are on the expected web page.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |     docker-compose.yml
    |     app.dockerfile
    |     ▾ src/
    |         app_test.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your dockerfile.
      code-block(title="/path/to/your/project/app.dockerfile" language="dockerfile")
        | FROM debian:stable-slim
        |
        | # Install chrome driver
        | RUN apt update -y && apt clean -y
        | RUN apt install gnupg -y
        | ENV CHROME_VERSION "google-chrome-stable"
        | RUN sed -i -- 's&deb http://deb.debian.org/debian jessie-updates main&#deb http://deb.debian.org/debian jessie-updates main&g' /etc/apt/sources.list \
        |   && apt-get update && apt-get install wget -y
        | RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
        |   && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list \
        |   && apt-get update && apt-get -qqy install ${CHROME_VERSION:-google-chrome-stable}
        |
        | # Install firefox driver
        | RUN apt update && apt install wget curl bzip2 -y
        | RUN apt-get remove iceweasel
        | ENV FILENAME "firefox-latest.tar.bz2"
        | RUN wget -O $FILENAME --content-disposition "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=en-US" \
        |   && apt install bzip2
        | RUN tar -jxf $FILENAME -C /opt/
        | RUN ln -sf /opt/firefox/firefox  /usr/bin/firefox
        | RUN rm $FILENAME
        | RUN apt install libgtk-3-0 libx11-6 libx11-xcb1 libdbus-glib-1-2 xdg-utils -y
        | RUN apt clean
        |
        | # Install deno
        | RUN apt install curl unzip -y
        | RUN curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=/usr/local sh
        | RUN export DENO_INSTALL="/root/.local"
        | RUN export PATH="$DENO_INSTALL/bin:$PATH"
      p Here, you are using a very small image (debian-slim) as your baseline for your docker container. Then you install the chrome-driver and firefox-driver, which allows Sinco to create a headless browser instance for these browsers. Then you install Deno, because whilst you may have Deno installed on your host machine, it won't be from within docker unless you tell it to.

    li
      p Create your docker compose file.
      code-block(title="/path/to/your/project/docker-compose.yml" language="yaml")
        | version: '3'
        |
        | services:
        |   app:
        |     container_name: my_app
        |     build:
        |       context: .
        |       dockerfile: app.dockerfile
        |     volumes:
        |       - ./src:/var/www/my-app
        |     command: bash -c "deno test --allow-run --allow-net"
        |     working_dir: /var/www/my-app
      p Here, you are creating your docker-compose file, which will start/run your container, and execute your test file.

      p Create your test file.
      code-block(title="/path/to/your/project/src/app_test.ts" language="typescript")
        | import { buildFor } from "https://deno.land/x/sinco@{{ $conf.sinco.latest_version }}/mod.ts";
        |
        | Deno.test("My web app works as expected", async () => {
        |   const Chrome = await buildFor("chrome");
        |   await Chrome.goTo("https://chromestatus.com");
        |   await Chrome.click('a[href="/features/schedule"]');
        |   await Chrome.waitForPageChange();
        |   await Chrome.assertUrlIs("https://chromestatus.com/features/schedule");
        |   await Chrome.done();
        |   const Firefox = await buildFor("chrome");
        |   await Firefox.goTo("https://chromestatus.com");
        |   await Firefox.click('a[href="/features/schedule"]');
        |   await Firefox.waitForPageChange();
        |   await Firefox.assertUrlIs("https://chromestatus.com/features/schedule");
        |   await Firefox.done();
        | })
      p Here you are going to create your headless browser instance, and navigate to <code>https://chromestatus.com</code>. Once the page has loaded, you will click an element matching the <code>a[href="/features/schedule"]</code> selector, which will send you to a different page. To assert this, you are going to use <code>.assertUrlIs()</code> to assert the page you are currently on, has now changed.
  hr
  h2-hash Verification
  ol
    li
      p Run your test.
      code-block(title="Terminal" language="shell-session")
        | $ docker-compose build
        | $ docker-compose up
    li
      p All of your tests should pass, and your docker container should exit successfully.

</template>

