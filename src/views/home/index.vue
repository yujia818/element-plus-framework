<template>
  <app-header />
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "../../components/header.vue";

import { get_user_docs } from "../../apis/doc";

export default {
  components: {
    "app-header": Header,
  },
  setup() {
    const route = useRoute();
    onMounted(async () => {
      const { userId } = route.params;
      const res = await get_user_docs({ userId });
      const { code, data } = res;
      if (code === 100) {
      }
    });
  },
};
</script>

<style></style>
