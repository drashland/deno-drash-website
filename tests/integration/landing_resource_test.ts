import { Rhum } from "../deps.ts";

const url = `http://localhost:1445`;

Rhum.testPlan("tests/integration/landing_resource_test.ts", () => {
  Rhum.testSuite("GET /", () => {
    Rhum.testCase("Responds with a 200 on request", async () => {
      // Development
      const res = await fetch(url);
      Rhum.asserts.assertEquals(res.status, 200);
      const text = await res.text();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land [development]");
    });
  });
});

Rhum.run();
