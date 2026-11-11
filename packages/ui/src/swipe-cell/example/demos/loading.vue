<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const beforeWait = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 800))
</script>
<template>
  <mp-space direction="column" style="width: 100%" :size="16">
    <mp-form layout="vertical"
      ><mp-form-item label="加载状态 / Loading"><mp-switch v-model="loading" /></mp-form-item
    ></mp-form>
    <mp-swipe-cell :before-close="beforeWait" :loading="loading" :right-width="80"
      ><p>向左滑动 / Swipe left</p>
      <template #right><mp-button>删除 / Delete</mp-button></template></mp-swipe-cell
    >
    <p>
      通过 loading 显式控制等待展示，普通事件返回 Promise 不会自动加载。Loading is controlled by business state.
      关闭手动加载后切换或关闭，观察 before 守卫的自动等待反馈。
    </p>
  </mp-space>
</template>
