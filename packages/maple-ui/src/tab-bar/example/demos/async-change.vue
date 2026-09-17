<script setup>
import { ref } from 'vue'

const active = ref(0)
async function beforeChange(value) {
  if (value === 3) {
    return false
  }
  if (value === 4) {
    throw new Error('Demo: rejected selection')
  }
  await new Promise((resolve) => setTimeout(resolve, value === 1 ? 1200 : 250))
  return true
}
</script>
<template>
  <p>
    先点慢速（1.2 秒），再点快速（0.25 秒），最终只切到快速；拒绝和异常都会保持当前选中。等待时点击当前标签可取消切换。
  </p>
  <mp-tab-bar v-model:active="active" :before-change="beforeChange">
    <mp-tab-bar-item label="首页" />
    <mp-tab-bar-item label="慢速" />
    <mp-tab-bar-item label="快速" />
    <mp-tab-bar-item label="拒绝" />
    <mp-tab-bar-item label="异常" />
  </mp-tab-bar>
  <p aria-live="polite">当前选中: {{ active }}</p>
</template>
