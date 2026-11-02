<script setup>
import { reactive, ref } from 'vue'
import { Message } from '@maple-design/ui'
import ModelOutput from '../../components/ModelOutput.vue'

const formData = reactive({ username: '', password: '' })
const result = ref('Not submitted')
const handleSubmit = ({ errors }) => {
  result.value = errors ? 'Invalid' : 'Valid'
  Message(`Submit: ${errors ? 'invalid' : 'valid'}`)
}
const handleReset = () => {
  result.value = 'Reset'
  Message('Form reset')
}
</script>

<template>
  <mp-form edit-mode="direct" :model="formData" @submit="handleSubmit" @reset="handleReset">
    <mp-space direction="column" align="stretch" :size="[14, 0]">
      <mp-form-item field="username" :rules="[(value) => !!value || 'Username is required']">
        <mp-input v-model="formData.username" edit-mode="direct" placeholder="Username" />
      </mp-form-item>
      <mp-form-item field="password" :rules="[(value) => !!value || 'Password is required']">
        <mp-input v-model="formData.password" edit-mode="direct" type="password" placeholder="Password" />
      </mp-form-item>
      <mp-space>
        <mp-button status="primary" html-type="submit">Submit</mp-button>
        <mp-button html-type="reset">Reset</mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
  <p role="status">Submit result: {{ result }}</p>
  <ModelOutput>{{ formData }}</ModelOutput>
</template>
