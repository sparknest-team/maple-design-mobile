<script setup>
import { Dialog, Message } from '@maple-design/ui'

const actions = {
  confirm: () => Message.success('confirm'),
  cancel: () => Message.error('cancel'),
  close: () => Message.info('close'),
}
function createBasic() {
  Dialog.open('兰亭临帖 行书如行云流水')
}
async function createAction() {
  const action = await Dialog.open('兰亭临帖 行书如行云流水')
  action && actions[action]?.()
}
function createAndUpdate() {
  const instance = Dialog.open({
    title: '打开对话框',
    message: '兰亭临帖 行书如行云流水',
  })
  setTimeout(() => instance.update({ title: '修改标题' }), 600)
}
function hideButtons() {
  Dialog.open({
    message: '兰亭临帖 行书如行云流水',
    confirmButton: false,
    cancelButton: false,
  })
}
function createOpen() {
  Dialog.open({
    title: '兰亭序',
    message: '兰亭临帖 行书如行云流水',
    onConfirm: () => Message.success('confirm'),
  })
}
</script>

<template>
  <mp-button status="primary" block @click="createBasic">基本使用</mp-button>
  <mp-button status="primary" block @click="createOpen">打开对话框</mp-button>
  <mp-button status="primary" block @click="createAndUpdate">动态更新</mp-button>
  <mp-button status="primary" block @click="createAction">处理用户行为</mp-button>
  <mp-button status="primary" block @click="hideButtons">隐藏按钮</mp-button>
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
