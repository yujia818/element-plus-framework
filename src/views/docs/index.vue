<template>
  <div class="documents">
    <el-menu
      :default-active="activeIndex"
      class="documents-menu"
      @select="handleSelect"
    >
      <el-menu-item v-for="(item, index) in documents" :index="index" @click="() => onMenuClick(item.docId)">{{
        item.doc.title
      }}</el-menu-item>
    </el-menu>
    <editor />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { get_user_docs } from "../../apis/doc";
import editor from './editor.vue';
export default {
  components: {
    'editor': editor
  },
  setup() {
    const _set = {};
    _set.documents = ref();

    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      const { userId } = route.params;
      const res = await get_user_docs({ userId });
      const { code, data } = res;
      if (code === 100) {
        console.log(data);
        _set.documents.value = data;
      }
    });

    _set.onMenuClick = (docId) => {
        router.push(`${docId}`);
    };

    return _set;
  },
};
</script>

<style scoped lang="scss">
.documents {
    display: flex;
  .documents-menu {
    width: 200px;
  }
}
</style>
