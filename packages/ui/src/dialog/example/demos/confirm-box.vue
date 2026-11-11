<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui-vue'

const confirmOpen = ref(false)
const actions = {
  confirm: () => Message.success('confirm'),
  cancel: () => Message.error('cancel'),
  close: () => Message.info('close'),
}
async function createConfirm() {
  const action = await Dialog.confirm({
    title: '确认操作',
    message: '确定要执行此操作吗？',
  })
  action && actions[action]?.()
}
async function createDangerConfirm() {
  const action = await Dialog.confirm({
    title: '危险操作',
    message: '删除后无法恢复，确定继续吗？',
    confirmButtonText: '删除',
    confirmButtonProps: { variant: 'default', status: 'danger' },
  })
  action && actions[action]?.()
}
</script>

<template>
  <mp-button status="primary" block @click="createConfirm">确认对话框</mp-button>
  <mp-button status="danger" block @click="createDangerConfirm">危险操作确认</mp-button>
  <mp-button status="warning" block @click="confirmOpen = true">组件调用</mp-button>
  <mp-dialog v-model:open="confirmOpen" type="warning" title="确认操作" message="确定要执行此操作吗？" />
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
