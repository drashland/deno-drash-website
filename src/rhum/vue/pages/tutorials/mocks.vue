<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";

const title = "Mocks";

export const resource = {
  paths: [
    "/tutorials/mocks",
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
        "Creating A Mock",
        "Checking Calls",
        "Mock Constructor Arguments",
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
  p Rhum defines mocks as follows:
  ul
    li Mocks register calls they receive
  p Unlike stubs, mocks help verify behavior. For example, you can mock an email service class and check to see if it is called in a test.
  hr
  h2-hash Creating A Mock
  p Creating a mock can be done as follows:
  code-block(:header="false" language="typescript")
    | class ToBeMocked { ... }
    |
    | const mock = Rhum
    |   .mock(ToBeMocked)
    |   .withConstructorArgs("someArg") // if the class to be mocked has a constructor and it requires args
    |   .create();
  hr
  h2-hash Checking Calls
  p Since mocks register calls they receive, you can check to see how many times a mocked object's methods were called by accessing its <code>calls</code> property. Below is an example of checking if a math service's <code>add()</code> method was called.
  code-block(:header="false" language="typescript")
    | class MathService {
    |   add(num1: number, num2: number): number {
    |     return num1 + num2;
    |   }
    | }
    |
    | class MyObj {
    |   protected service: MathService;
    |   constructor(service: MathService) { ... }
    |   add(num1: number, num2: number): number {
    |     return this.service.add(num1, num2);
    |   }
    | }
    |
    | const mock = Rhum.mock(MathService).create();
    |
    | const myObj = new MyObj(mock);
    |
    | // Assert that the service's add() method was not called yet
    | Rhum.asserts.assertEquals(mock.calls.add, 0); // pass
    |
    | // Assert that the service's add() method was called once
    | myObj.add(1, 1);
    | Rhum.asserts.assertEquals(mock.calls.add, 1); // pass
  hr
  h2-hash Mock Constructor Arguments
  p Mocks can be created with constructor arguments as follows.
  code-block(:header="false" language="typescript" line_highlight="8")
    | class ToBeMocked {
    |   constructor(arg1: string, arg2: number) { ... }
    | }
    |
    | // Create a mock with the following constructor args
    | const mock = Rhum
    |  .mock(ToBeMocked)
    |  .withConstructorArgs("someStringArg", 1)
    |  .create();
</template>

