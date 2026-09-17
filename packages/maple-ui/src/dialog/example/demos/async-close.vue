<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maplejs/maple-ui'

const loadingOpen = ref(false)
function buttonLoadingClose(action, done, refs) {
  if (action !== 'confirm') {
    done()
    return
  }

  refs.confirmButtonLoading.value = true
  setTimeout(() => {
    refs.confirmButtonLoading.value = false
    done()
    Message.success('confirm')
  }, 1000)
}
function createAsyncClose() {
  Dialog.open({
    message: '兰亭临帖 行书如行云流水',
    beforeClose: buttonLoadingClose,
  })
}
</script>

<template>
  <mp-button status="primary" block @click="createAsyncClose">异步关闭</mp-button>
  <mp-button status="warning" block @click="loadingOpen = true">按钮 Loading</mp-button>
  <mp-dialog
    v-model:open="loadingOpen"
    title="兰亭序"
    message="兰亭临帖 行书如行云流水"
    :before-close="buttonLoadingClose"
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
