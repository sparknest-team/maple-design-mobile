<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
<template>
  <mp-space direction="column" style="width: 100%" :size="16">
    <mp-form layout="vertical"
      ><mp-form-item label="加载状态 / Loading"><mp-switch v-model="loading" /></mp-form-item
    ></mp-form>
    <mp-input-tag :loading="loading" :default-value="['示例 / Example']" />
    <p>通过 loading 显式控制等待展示，普通事件返回 Promise 不会自动加载。Loading is controlled by business state.</p>
  </mp-space>
</template>
