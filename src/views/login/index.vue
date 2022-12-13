<template>
  <div class="login-view">
    <div class="title">Notes</div>
    <el-form
      ref="formRef"
      :model="form"
      class="demo-dynamic"
      label-position="top"
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
        <el-input v-model="form.password" show-password/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin()">登陆</el-button>
        <el-button type="primary" @click="onRegist()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login, regist } from "../../apis/login";

const router = useRouter();
const form = reactive({});

const onLogin = async () => {
  const res = await login(form);
  const { code, data } = res;
  if (code === 100) {
    window.localStorage.setItem('access-token', data.token);
    router.push(`/home/${data.id}/docs`);
  }
};

const onRegist = async () => {
  const res = await regist(form);
  const { code, data } = res;
  if (code === 100) {
    window.localStorage.setItem('access-token', data.token);
    router.push(`/home/${data.id}/docs`);
  }
};
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #f5f7fa;
  .title {
    font-size: 48px;
    margin-bottom: 32px;
    color: #303133;
  }
}
</style>
