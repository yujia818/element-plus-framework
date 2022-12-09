<template>
  <app-header />
  <router-view />
</template>

<script>

import Header from "../../components/header.vue";

export default {
  components: {
    "app-header": Header,
  },
  setup() {

  },
};
</script>

<style></style>
