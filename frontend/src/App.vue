<template>
  <div id="app">
    <Add></Add>
    <Index></Index>
  </div>
</template>

<script>
import Add from "./components/todo/Add.vue";
import Index from "./components/todo/Index.vue";

export default {
  name: "app",
  components: {
    Add,
    Index
  }
};
</script>
