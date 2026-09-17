<script setup>
import { reactive, ref } from 'vue'

const widthOpen = ref(false)
const simpleOpen = ref(false)
const draggableOpen = ref(false)
const fullscreenOpen = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="widthOpen = true">自定义宽度</mp-button>
  <mp-dialog v-model:open="widthOpen" :width="320" title="兰亭序" message="兰亭临帖 行书如行云流水" />
  <mp-button status="warning" block @click="simpleOpen = true">简洁对话框</mp-button>
  <mp-dialog v-model:open="simpleOpen" simple title="兰亭序" message="兰亭临帖 行书如行云流水" />
  <mp-button status="warning" block @click="draggableOpen = true">可拖动对话框</mp-button>
  <mp-dialog v-model:open="draggableOpen" draggable title="兰亭序" message="兰亭临帖 行书如行云流水" />
  <mp-button status="warning" block @click="fullscreenOpen = true">全屏对话框</mp-button>
  <mp-dialog v-model:open="fullscreenOpen" fullscreen title="兰亭序" message="兰亭临帖 行书如行云流水" />
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
