<template>
  <mp-form :model="model">
    <mp-form-item
      field="account"
      label="Account"
      feedback
      :validate-status="status"
      :help="status === 'error' ? 'Enter an account and retry' : undefined"
    >
      <mp-input v-model="model.account" placeholder="Enter your account" clearable />
    </mp-form-item>
    <mp-button status="primary" :loading="status === 'validating'" @click="validate"
      >Simulate async validation</mp-button
    >
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
