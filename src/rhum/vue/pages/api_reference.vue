<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";
import CodeHash from "/common/vue/code_hash.vue";
import ACodeHash from "/common/vue/a_code_hash.vue";

const title = "API Reference";

export const resource = {
  paths: [
    "/api-reference",
  ],
  meta: {
    title: title
  }
}

export default {
  components: {
    ACodeHash,
    CodeHash,
    CodeBlock,
    H2Hash,
    Page,
  },
  data() {
    return {
      base_url: this.$conf.rhum.base_url + "/#",
      page_base_url: this.$conf.rhum.base_url + '/#/api-reference',
      title: title,
    };
  }
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :title="title"
)
  h2-hash Table Of Contents
  ul.mb-5
    li Properties
      ul
        li
          a-code-hash(:base_url="page_base_url") Rhum.asserts
    li Methods
      ul
        li
          a-code-hash(:base_url="page_base_url") Rhum.afterAll
        li
          a-code-hash(:base_url="page_base_url") Rhum.afterEach
        li
          a-code-hash(:base_url="page_base_url") Rhum.beforeAll
        li
          a-code-hash(:base_url="page_base_url") Rhum.beforeEach
        li
          a-code-hash(:base_url="page_base_url") Rhum.run
        li
          a-code-hash(:base_url="page_base_url") Rhum.skip
        li
          a-code-hash(:base_url="page_base_url") Rhum.testCase
        li
          a-code-hash(:base_url="page_base_url") Rhum.testPlan
        li
          a-code-hash(:base_url="page_base_url") Rhum.testSuite
  hr
  h2-hash Properties
  code-hash Rhum.asserts
  p The <a href="https://deno.land/std/testing/asserts.ts" target="_BLANK">asserts</a> module from the <a href="https://deno.land/std/testing" target="_BLANK">testing</a> module, but attached to Rhum for accessibility.
  code-block(:header="false" language="typescript")
    | Rhum.asserts.assertEquals(true, true); // pass
    | Rhum.asserts.assertEquals(true, false); // fail
  hr
  h2-hash Methods
  code-hash Rhum.afterAll
  p Used to define a hook that will execute after all test suites or test cases. If this is used inside of a test plan, then it will execute after all test suites. If this is used inside of a test suite, then it will execute after all test cases.
  code-block(:header="false" language="typescript")
    | Rhum.testPlan("My Plan", () => {
    |   Rhum.afterAll(() => {
    |     // Runs once after all test suites in this test plan
    |   });
    |   Rhum.testSuite("My Suite 1", () => {
    |     Rhum.afterAll(() => {
    |       // Runs once after all test cases in this test suite
    |     });
    |     Rhum.testCase("My Test Case 1", () => {
    |       ...
    |     });
    |   });
    | });
  code-hash Rhum.afterEach
  p Used to define a hook that will execute after each test suite or test case. If this is used inside of a test plan, then it will execute after each test suite. If this is used inside of a test suite, then it will execute after each test case.
  code-block(:header="false" language="typescript")
    | Rhum.testPlan("My Plan", () => {
    |   Rhum.afterEach(() => {
    |     // Runs after each test suite in this test plan
    |   });
    |   Rhum.testSuite("My Suite 1", () => {
    |     Rhum.afterEach(() => {
    |       // Runs after each test case in this test suite
    |     });
    |     Rhum.testCase("My Test Case 1", () => {
    |       ...
    |     });
    |   });
    | });
  code-hash Rhum.beforeAll
  p Used to define a hook that will execute before all test suites or test cases. If this is used inside of a test plan, then it will execute before all test suites. If this is used inside of a test suite, then it will execute before all test cases.
  code-block(:header="false" language="typescript")
    | Rhum.testPlan("My Plan", () => {
    |   Rhum.beforeAll(() => {
    |     // Runs once before all test suites in this test plan
    |   });
    |   Rhum.testSuite("My Suite 1", () => {
    |     Rhum.beforeAll(() => {
    |       // Runs once before all test cases in this test suite
    |     });
    |     Rhum.testCase("My Test Case 1", () => {
    |       ...
    |     });
    |   });
    | });
  code-hash Rhum.beforeEach
  p Used to define a hook that will execute before each test suite or test case. If this is used inside of a test plan, then it will execute before each test suite. If this is used inside of a test suite, then it will execute before each test case.
  code-block(:header="false" language="typescript")
    | Rhum.testPlan("My Plan", () => {
    |   Rhum.beforeEach(() => {
    |     // Runs before each test suite in this test plan
    |   });
    |   Rhum.testSuite("My Suite 1", () => {
    |     Rhum.beforeEach(() => {
    |       // Runs before each test case in this test suite
    |     });
    |     Rhum.testCase("My Test Case 1", () => {
    |       ...
    |     });
    |   });
    | });
  code-hash Rhum.run
  p Runs your test plan.
  code-block(:header="false" language="typescript")
    | Rhum.testPlan("My Plan", () => {
    |   ...
    | });
    |
    | Rhum.run();
  code-hash Rhum.skip
  p Allows a test plan, suite, or case to be skipped when the tests run.
  code-block(:header="false" language="typescript")
    | Rhum.testPlan("My Plan", () => {
    |   Rhum.skip("My Suite 1", () => { // will not run this block
    |     Rhum.testCase("My Test Case In Suite 1", () => {
    |       ...
    |     });
    |   });
    |   Rhum.testSuite("My Suite 2", () => {
    |     Rhum.testCase("My Test Case In Suite 2", () => {
    |       ...
    |     });
    |     Rhum.skip("My Other Test Case In Suite 2", () => { // will not run this block
    |       ...
    |     });
    |   });
    | });
  code-hash Rhum.testCase
  p A test case is grouped by a test suite and it is what makes the assertions - it is the test. You can define multiple test cases under a test suite. Test cases can also be asynchronous. Test cases can only be defined inside of a test suite.
  code-block(:header="false" language="typescript")
    | Rhum.testPlan("My Plan", () => {
    |   Rhum.testSuite("My Suite 1", () => {
    |     Rhum.testCase("My Test Case 1", () => {
    |       Rhum.assert.assertEquals(something, true);
    |     });
    |     Rhum.testCase("My Test Case 2", () => {
    |       Rhum.assert.assertEquals(something, false);
    |     });
    |   });
    | });
  code-hash Rhum.testPlan
  p Groups up test suites to describe a test plan. Usually, a test plan is per file and contains the tests suites and test cases for a single file. Test plans are required in order to define a test suite with test cases.
  code-block(:header="false" language="typescript")
    | Rhum.testPlan("My Plan", () => {
    |   ...
    | });
  code-hash Rhum.testSuite
  p A test suite usually describes a method or property name and groups up all test cases for that method or property. You can define multiple test suites under a test plan. Test suites can only be defined inside of a test plan.
  code-block(:header="false" language="typescript")
    | Rhum.testPlan("My Plan", () => {
    |   Rhum.testSuite("My Suite 1", () => {
    |     ...
    |   });
    |   Rhum.testSuite("My Suite 2", () => {
    |     ...
    |   });
    | });
</template>

