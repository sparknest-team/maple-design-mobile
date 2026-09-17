<script setup>
import { reactive, ref } from 'vue'

const longContentOpen = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="longContentOpen = true">长内容</mp-button>
  <mp-dialog v-model:open="longContentOpen" title="长内容" :body-style="{ maxHeight: '50vh', overflowY: 'auto' }">
    <p v-for="item in 12" :key="item">{{ item }}. 长内容保持可滚动，标题和操作按钮保持可见。</p>
  </mp-dialog>
</template>

<style lang="less" scoped>
.mp-button {
  margin-bottom: 11px;
}

.dialog-demo__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 12px 12px;
}

:deep(.dialog-demo__body--custom) {
  font-weight: 500;
}

.dialog-demo__body-content {
  padding: 16px 20px;
}
</style>
