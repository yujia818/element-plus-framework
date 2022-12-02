<template>
  <div class="login-view">
    <el-form
      ref="formRef"
      :model="form"
      label-width="120px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="username"
        label="用户名"
        :rules="[
          {
            required: true,
            message: 'Please input user name',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item
        prop="password"
        label="密码"
        :rules="[
          {
            required: true,
            message: 'Please input password',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../../apis/login";

const router = useRouter();
const form = reactive({});

const submitForm = async () => {
  const res = await login(form);
  const { code, data } = res;
  if (code === 100) {
    window.localStorage.setItem('access-token', data.token);
    router.push(`/home/${data.userId}`);
  }
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
