<template>
  <mp-form :model="model">
    <mp-form-item
      field="account"
      label="账户"
      feedback
      :validate-status="status"
      :help="status === 'error' ? '请输入账户后重试' : undefined"
    >
      <mp-input v-model="model.account" placeholder="请输入账户" clearable />
    </mp-form-item>
    <mp-button status="primary" :loading="status === 'validating'" @click="validate">模拟异步校验</mp-button>
  </mp-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ account: '' })
const status = ref<'validating' | 'success' | 'error'>()
let request = 0
async function validate() {
  const current = ++request
  const value = model.account
  status.value = 'validating'
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (current === request) {
    status.value = value.trim() ? 'success' : 'error'
  }
}
</script>
