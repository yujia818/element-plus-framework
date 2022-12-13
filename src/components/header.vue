<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">Documents</el-menu-item>
    </el-menu>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const activeIndex = ref('1')
  const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
  }
  </script>
  
  <style scoped>
  .ep-menu-item {
    width: 200px;
  }
  </style>
  