import { Rhum } from "../deps.ts";
const serverConfigs = {
  hostname: "0.0.0.0",
  port: 1445,
};

const url = `http://${serverConfigs.hostname}:${serverConfigs.port}`;

Rhum.testPlan("tests/docker/ping_test.ts", () => {
  Rhum.testSuite("GET /", () => {
    Rhum.testCase("Responds with a 200 on request", async () => {
      // Development
      const res = await fetch(url);
      Rhum.asserts.assertEquals(res.status, 200);
      const text = await res.text();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land [development]");
      // Staging
      const res2 = await fetch(url, {
        headers: {
          "host": "staging",
        },
      });
      Rhum.asserts.assertEquals(res2.status, 200);
      const text2 = await res2.text();
      const title2 = text2.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title2, "Drash Land [staging]");
      // Prod
      const res3 = await fetch(url, {
        headers: {
          "x-forwarded-host": "Blah blah blah",
        },
      });
      Rhum.asserts.assertEquals(res3.status, 200);
      const text3 = await res3.text();
      const title3 = text3.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title3, "Drash Land");
    });
  });
});

Rhum.run();
