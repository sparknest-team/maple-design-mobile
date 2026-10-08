<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="open = true">嵌入内容</mp-button>
  <mp-overlay v-model:open="open">
    <div class="overlay-content">点击背景区域或按 Escape 关闭</div>
  </mp-overlay>
</template>

<style lang="less" scoped>
.overlay-content {
  padding: 24px;
  width: 312px;
  background: var(--mp-color-fill-3);
  border-radius: 28px;
}
</style>
