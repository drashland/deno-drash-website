import { server } from "../../server.ts";
import { Rhum } from "../deps.ts";

const url = `http://localhost:1445`;

Rhum.testPlan("tests/integration/module_resource_test.ts", () => {
  Rhum.testSuite(
    "GET /:module (should redirect back to the module resource with the version set as the latest version)",
    () => {
      Rhum.testCase(
        "Responds with 302 and redirects to latest version when `module` is drash",
        async () => {
          const res = await fetch(`${url}/drash`);
          await res.text();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/drash/v1.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 302 redirects to latest version when `module` is dmm",
        async () => {
          const res = await fetch(`${url}/dmm`);
          await res.text();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/dmm/v1.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 302 redirects to latest version when `module` is rhum",
        async () => {
          const res = await fetch(`${url}/rhum`);
          await res.text();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/rhum/v1.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 302 redirects to latest version when `module` is wocket",
        async () => {
          const res = await fetch(`${url}/wocket`);
          await res.text();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/wocket/v0.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 302 redirects to latest version when `module` is sinco",
        async () => {
          const res = await fetch(`${url}/sinco`);
          await res.text();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/sinco/v2.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 302 redirects to latest version when `module` is line",
        async () => {
          const res = await fetch(`${url}/line`);
          await res.text();
          Rhum.asserts.assertEquals(res.status, 200);
          Rhum.asserts.assertEquals(res.url, `${url}/line/v0.x/`);
        },
      );
      Rhum.testCase(
        "Responds with 404 when `module` is not a recognised module",
        async () => {
          const res = await fetch(`${url}/hella`);
          await res.text();
          Rhum.asserts.assertEquals(res.status, 404);
          Rhum.asserts.assertEquals(res.url, `${url}/hella`);
        },
      );
    },
  );
  Rhum.testSuite("GET /:module/:version", () => {
    Rhum.testCase("Responds with 200 for /drash/v1.x", async () => {
      // Development
      const res = await fetch(`${url}/drash/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/drash/v1.x`);
      const text = await res.text();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Drash");
      const bundle = text.includes(
        `<script src="/assets/bundles/drash-v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /dmm/v1.x", async () => {
      // Development
      const res = await fetch(`${url}/dmm/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/dmm/v1.x`);
      const text = await res.text();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Dmm");
      const bundle = text.includes(
        `<script src="/assets/bundles/dmm-v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /rhum/v1.x", async () => {
      const res = await fetch(`${url}/rhum/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/rhum/v1.x`);
      const text = await res.text();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Rhum");
      const bundle = text.includes(
        `<script src="/assets/bundles/rhum-v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /wocket/v0.x", async () => {
      const res = await fetch(`${url}/wocket/v0.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/wocket/v0.x`);
      const text = await res.text();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Wocket");
      const bundle = text.includes(
        `<script src="/assets/bundles/wocket-v0.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /sinco/v1.x", async () => {
      const res = await fetch(`${url}/sinco/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/sinco/v1.x`);
      const text = await res.text();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Sinco");
      const bundle = text.includes(
        `<script src="/assets/bundles/sinco-v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /line/v0.x", async () => {
      const res = await fetch(`${url}/line/v0.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/line/v0.x`);
      const text = await res.text();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Line");
      const bundle = text.includes(
        `<script src="/assets/bundles/line-v0.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /sinco/v2.x", async () => {
      const res = await fetch(`${url}/sinco/v2.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/sinco/v2.x`);
      const text = await res.text();
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
        const res = await fetch(`${url}/drash/hella`);
        await res.text();
        Rhum.asserts.assertEquals(res.status, 404);
        Rhum.asserts.assertEquals(res.url, `${url}/drash/hella`);
      },
    );
  });
});

Rhum.run();
