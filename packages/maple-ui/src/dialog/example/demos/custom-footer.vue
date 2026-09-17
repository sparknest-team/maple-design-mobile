<script setup>
import { reactive, ref } from 'vue'

const slotsOpen = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="slotsOpen = true">自定义插槽</mp-button>
  <mp-dialog v-model:open="slotsOpen">
    <template #title>
      <m-icon-info-circle-fill color="var(--mp-color-primary)" />
    </template>
    <mp-cell>兰亭临帖 行书如行云流水</mp-cell>
    <mp-cell>兰亭临帖 行书如行云流水</mp-cell>
    <template #footer="{ confirm, cancel, close }">
      <div class="dialog-demo__footer">
        <mp-button variant="text" @click="close">关闭</mp-button>
        <mp-button variant="text" @click="cancel">取消</mp-button>
        <mp-button status="primary" @click="confirm">确认</mp-button>
      </div>
    </template>
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
