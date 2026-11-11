<script setup>
import { Dialog, Message } from '@maple-design/ui-vue'

function createAlert() {
  Dialog.alert({
    title: '兰亭序',
    message: '兰亭临帖 行书如行云流水',
    type: 'info',
  })
}
</script>

<template>
  <mp-button status="primary" block @click="createAlert">Alert 对话框</mp-button>
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
