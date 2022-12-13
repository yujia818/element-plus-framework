<template>
  <div class="documents">
    <div class="documents-menu-wrapper">
      <div class="operation-group">
        <el-button class="add-button" type="primary" :icon="Add" circle @click="onAddClick" />
      </div>
      <el-menu
        :default-active="currentDocId"
        class="documents-menu"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="(item, index) in documents"
          :index="'doc' + item.docId"
          @click="() => onMenuClick(item.docId)"
          >{{ item.doc.title }}</el-menu-item
        >
      </el-menu>
    </div>
    <editor />
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { get_user_docs, add_user_doc } from "../../apis/doc";
import editor from "./editor.vue";
import { Plus } from "@element-plus/icons-vue";
export default {
  components: {
    editor: editor,
  },
  setup() {
    const _set = {};
    _set.documents = ref();

    _set.Add = Plus;

    const route = useRoute();
    const router = useRouter();

    const loadDocList = async () => {
      const { userId } = route.params;
      const res = await get_user_docs({ userId });
      const { code, data } = res;
      if (code === 100) {
        _set.documents.value = data;
      }
    };

    _set.currentDocId = computed(() => {
      const { docId } = route.params;
      return "doc" + docId;
    });

    _set.onMenuClick = (docId) => {
      router.push(`${docId}`);
    };

    _set.onAddClick = async () => {
      const { userId } = route.params;
      const { code, data } = await add_user_doc({
        title: "Default Title",
        content: "Default Content",
        userId: userId,
      });
      if (code === 100) {
        loadDocList();
        router.push(`${data.docId}`);
      }
    };

    onMounted(async () => {
      await loadDocList();
      const { userId, docId } = route.params;
      if (!docId) {
        router.push(`/home/${userId}/docs/${_set.documents.value[0].docId}`);
      }
    });

    return _set;
  },
};
</script>

<style scoped lang="scss">
.documents {
  display: flex;
  height: calc(100% - 48px);
  .documents-menu-wrapper {
    flex: 1;
    .operation-group {
      display: flex;
      justify-content: space-between;
      padding: 12px 0px 6px 16px;
      border-right: 1px solid rgb(220, 223, 230);
      .add-button {
        height: 24px;
        width: 24px;
      }
    }
    .documents-menu {
      height: calc(100% - 56px);
      overflow: auto;
    }
  }
}
</style>
