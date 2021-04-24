import { server } from "../../server.ts";
import { Rhum } from "../deps.ts";

const serverConfigs = {
  hostname: "localhost",
  port: 1447,
};
const url = `http://${serverConfigs.hostname}:${serverConfigs.port}`;

Rhum.testPlan("tests/integration/module_resource_test.ts", () => {
  Rhum.testSuite(
    "GET /:module (should redirect back to the module resource with the version set as the latest version)",
    () => {
      Rhum.testCase(
        "Responds with 302 and redirects to latest version when `module` is drash",
        async () => {
          await server.run(serverConfigs);
          const res = await fetch(`${url}/drash`);
          await res.text();
          server.close();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/drash/v1.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 302 redirects to latest version when `module` is dmm",
        async () => {
          await server.run(serverConfigs);
          const res = await fetch(`${url}/dmm`);
          await res.text();
          server.close();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/dmm/v1.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 302 redirects to latest version when `module` is rhum",
        async () => {
          await server.run(serverConfigs);
          const res = await fetch(`${url}/rhum`);
          await res.text();
          server.close();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/rhum/v1.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 302 redirects to latest version when `module` is wocket",
        async () => {
          await server.run(serverConfigs);
          const res = await fetch(`${url}/wocket`);
          await res.text();
          server.close();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/wocket/v0.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 302 redirects to latest version when `module` is sinco",
        async () => {
          await server.run(serverConfigs);
          const res = await fetch(`${url}/sinco`);
          await res.text();
          server.close();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/sinco/v2.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 404 when `module` is not a recognised module",
        async () => {
          await server.run(serverConfigs);
          const res = await fetch(`${url}/hella`);
          await res.text();
          server.close();
          Rhum.asserts.assertEquals(res.status, 404);
          Rhum.asserts.assertEquals(res.url, `${url}/hella`);
        },
      );
    },
  );
  Rhum.testSuite("GET /:module/:version", () => {
    Rhum.testCase("Responds with 200 for /drash/v1.x", async () => {
      await server.run(serverConfigs);
      // Development
      const res = await fetch(`${url}/drash/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/drash/v1.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Drash");
      const bundle = text.includes(
        `<script src="/assets/bundles/drash-v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /dmm/v1.x", async () => {
      await server.run(serverConfigs);
      // Development
      const res = await fetch(`${url}/dmm/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/dmm/v1.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Dmm");
      const bundle = text.includes(
        `<script src="/assets/bundles/dmm-v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /rhum/v1.x", async () => {
      await server.run(serverConfigs);
      const res = await fetch(`${url}/rhum/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/rhum/v1.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Rhum");
      const bundle = text.includes(
        `<script src="/assets/bundles/rhum-v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /wocket/v0.x", async () => {
      await server.run(serverConfigs);
      const res = await fetch(`${url}/wocket/v0.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/wocket/v0.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Wocket");
      const bundle = text.includes(
        `<script src="/assets/bundles/wocket-v0.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /sinco/v1.x", async () => {
      await server.run(serverConfigs);
      const res = await fetch(`${url}/sinco/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/sinco/v1.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Sinco");
      const bundle = text.includes(
        `<script src="/assets/bundles/sinco-v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /sinco/v2.x", async () => {
      await server.run(serverConfigs);
      const res = await fetch(`${url}/sinco/v2.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/sinco/v2.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Sinco");
      const bundle = text.includes(
        `<script src="/assets/bundles/sinco-v2.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase(
      "Responds with 404 when `version` is not a recognised version for the module",
      async () => {
        await server.run(serverConfigs);
        const res = await fetch(`${url}/drash/hella`);
        await res.text();
        server.close();
        Rhum.asserts.assertEquals(res.status, 404);
        Rhum.asserts.assertEquals(res.url, `${url}/drash/hella`);
      },
    );
  });
});

Rhum.run();
