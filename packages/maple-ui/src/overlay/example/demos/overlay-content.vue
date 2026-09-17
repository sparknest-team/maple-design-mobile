<script setup>
import { reactive, toRefs } from 'vue'

const values = reactive({
  baseOverlay: false,
  contentOverlay: false,
  clickOverlay: false,
})
const { baseOverlay, contentOverlay, clickOverlay } = toRefs(values)
</script>

<template>
  <mp-button status="primary" block @click="contentOverlay = true"> 嵌入内容 </mp-button>
</template>

<style lang="less" scoped>
.overlay-content {
  padding: 24px;
  width: 312px;
  background: var(--mp-color-fill-3);
  border-radius: 28px;
}
</style>
