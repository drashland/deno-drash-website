<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";

const title = "Writing Tests";

export const resource = {
  paths: [
    "/tutorials/writing-tests",
  ],
  meta: {
    title: title
  }
}

export default {
  components: {
    CodeBlock,
    H2Hash,
    Page,
  },
  data() {
    return {
      base_url: this.$conf.rhum.base_url + "/#",
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
  p There are three parts to a test file:
  ul
    li the test plan;
    li the test suites; and
    li the test cases
  h3 Test Plans
  p Test plans describe a set of test suites. A test plan usually has the same name as the test file (e.g., <code>mod_test.ts</code>). Test suites are defined inside test plans.
  h3 Test Suites
  p Test suites describe a set of test cases. A test suite is usually named after a method or property being tested (e.g., <code>myMethod()</code>). Test cases are defined inside test suites.
  h3 Test Cases
  p Test cases contain the assertions. They are the tests.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text")
      | ▾ /path/to/your/project/
      |     functions.ts
      |     functions_test.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your functions file.
      code-block(title="/path/to/your/project/functions.ts" language="typescript")
        | /**
        |  * Add two numbers together.
        |  * @param numOne - The first number in the equation.
        |  * @param numTwo - The second number in the equation.
        |  * @returns The sum of the specified numbers.
        |  */
        | export function add(numOne: number, numTwo: number): number {
        |   return numOne + numTwo;
        | }
    li
      p Create your test file.
      code-block(title="/path/to/your/project/functions_test.ts" language="typescript")
        | import { Rhum } from "https://deno.land/x/rhum@{{ $conf.rhum.latest_version }}/mod.ts";
        | import { add } from "./functions.ts";
        |
        | // Define the test plan
        | Rhum.testPlan("functions_test.ts", () => {
        |
        |   // Define the test suite
        |   Rhum.testSuite("add()", () => {
        |
        |     // Define the test case
        |     Rhum.testCase("should add two numbers together", () => {
        |       const actual = add(2, 2);
        |       Rhum.asserts.assertEquals(actual, 4);
        |     });
        |   });
        | });
        |
        | // Run Rhum
        | Rhum.run();
  hr
  h2-hash Verification
  ol
    li
      p Run your tests.
      code-block(title="Terminal" language="shell-session")
        | $ deno test
      p You should see the output similar to the following:
      code-block(title="Terminal" language="shell-session")
        | Compile file:///.deno.test.ts
        | running 1 tests
        | 
        | functions_test.ts
        |     add()
        |         should add two numbers together ... ok (3ms)
        | 
        | test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (3ms)
</template>

