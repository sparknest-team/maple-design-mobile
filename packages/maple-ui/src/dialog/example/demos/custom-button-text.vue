<script setup>
import { reactive, ref } from 'vue'

const customTextOpen = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="customTextOpen = true">定制按钮文字</mp-button>
  <mp-dialog
    v-model:open="customTextOpen"
    title="兰亭序"
    message="兰亭临帖 行书如行云流水"
    confirm-button-text="继续"
    cancel-button-text="退出"
  />
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
