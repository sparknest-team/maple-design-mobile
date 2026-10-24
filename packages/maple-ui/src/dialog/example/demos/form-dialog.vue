<script setup>
import { reactive, ref } from 'vue'
import { Dialog, Message } from '@maple-design/ui'

const formOpen = ref(false)
const formRef = ref(null)
const formData = reactive({ name: '', email: '' })
async function formBeforeClose(action, done, refs) {
  if (action !== 'confirm') {
    done()
    return
  }

  refs.confirmButtonLoading.value = true
  const errors = await formRef.value?.validate()
  refs.confirmButtonLoading.value = false
  if (!errors) {
    done()
    Message.success('表单提交成功')
  }
}
</script>

<template>
  <mp-button status="warning" block @click="formOpen = true">对话框表单</mp-button>
  <mp-dialog v-model:open="formOpen" title="对话框表单" :before-close="formBeforeClose">
    <mp-form ref="formRef" :model="formData">
      <mp-form-item field="name" label="姓名" :rules="[(value) => !!value || '该字段为必填项']">
        <mp-input v-model="formData.name" placeholder="请输入姓名" />
      </mp-form-item>
      <mp-form-item field="email" label="邮箱" :rules="[(value) => !!value || '该字段为必填项']">
        <mp-input v-model="formData.email" type="email" placeholder="请输入邮箱" />
      </mp-form-item>
    </mp-form>
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
