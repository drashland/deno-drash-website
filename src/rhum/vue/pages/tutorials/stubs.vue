<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";

const title = "Stubs";

export const resource = {
  paths: [
    "/tutorials/stubs",
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
        "Stubbing Properties",
        "Stubbing Methods",
      ]
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
  p Rhum defines stubs as follows:
  ul
    li Stubs provide canned answers to calls made during tests
    li Stubs do not respond to calls outside the test's scope
  p Unlike mocks, stubs are used to help verify the state of the system being tested. For example, you can check to see if the system being tested is in a certain state when stubbing an object's property to a certain value.
  hr
  h2-hash Stubbing Properties
  p Stubbing an object's properties can be done as follows:
  code-block(:header="false" language="typescript")
    | class MyObject {
    |   public some_property = "someValue";
    | }
    |
    | // Define the object that will have stubbed members as a stubbed object
    | const myStubbedObject = Rhum.stubbed(new MyObject());
    |
    | // Stub the object's some_property property to a certain value
    | myStubbedObject.stub("some_property", "this property is now stubbed");
    |
    | // Assert that the property was stubbed
    | Rhum.asserts.assertEquals(myStubbedObject.some_property, "this property is now stubbed"); // pass
  hr
  h2-hash Stubbing Methods
  p Stubbing an object's methods can be done as follows:
  code-block(:header="false" language="typescript")
    | class MyObject {
    |   public someMethod(): string {
    |      return "someValue";
    |   }
    | }
    |
    | // Define the object that will have stubbed members as a stubbed object
    | const myStubbedObject = Rhum.stubbed(new MyObject());
    |
    | // Stub the object's someMethod() method to return a certain value
    | myStubbedObject.stub("someMethod", () => { return "stubbed"; });
    |
    | // Assert that the method was stubbed
    | Rhum.asserts.assertEquals(myStubbedObject.someMethod(), "stubbed"); // pass
</template>

