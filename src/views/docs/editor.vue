<template>
  <div class="editor">
    <div class="header"><div class="left"></div>
      <el-button class="save-button" type="primary" :icon="Document" circle @click="onSave" />
    </div>
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { useRoute } from "vue-router";
import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { get_doc, save_doc } from "../../apis/doc";
import { Document } from "@element-plus/icons-vue";

export default {
  components: { Editor, Toolbar },
  setup() {
    const route = useRoute();
    
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("");

    const loadDoc = async (docId) => {
      const res = await get_doc({ docId });
      const { code, data } = res;
      if (code === 100) {
        valueHtml.value = data.content;
      }
    };

    // 模拟 ajax 异步获取内容
    onMounted(async () => {
      const { docId } = route.params;
      if (docId) {
        await loadDoc(docId);
      }
    });

    const toolbarConfig = {};
    const editorConfig = { placeholder: "请输入内容..." };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    watch(
      () => route.params.docId,
      async (docId) => {
        if (docId) {
          loadDoc(docId);
        }
      }
    );

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    const onSave = async () => {
      const { docId } = route.params;
      const res = await save_doc(docId, { content: valueHtml.value });
      const { code, data } = res;
      if (code === 100) {
        valueHtml.value = data.content;
      }
    };

    return {
      editorRef,
      valueHtml,
      mode: "simple", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      onSave,
      Document
    };
  },
};
</script>

<style scoped lang="scss">
.editor {
  min-width: calc(100% - 200px);
  max-width: calc(100% - 200px);
  .header {
      height: 34px;
      border-bottom: 1px solid #ccc;
      display: flex; 
      justify-content: space-between;
      padding: 8px 8px 0 8px;
      .save-button {
        height: 24px;
        width: 24px;
      }
    }
}
</style>
