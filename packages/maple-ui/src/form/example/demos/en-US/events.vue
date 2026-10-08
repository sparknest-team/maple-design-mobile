<script setup>
import { reactive } from 'vue'
import { Message } from '@maplejs/maple-ui'

const formData = reactive({ username: '', password: '' })
const handleSubmit = ({ errors }) => Message(`Submit: ${errors ? 'invalid' : 'valid'}`)
const handleReset = () => Message('Form reset')
</script>

<template>
  <mp-form :model="formData" @submit="handleSubmit" @reset="handleReset">
    <mp-space direction="column" :size="[14, 0]">
      <mp-form-item field="username" :rules="[(value) => !!value || 'Username is required']">
        <mp-input v-model="formData.username" placeholder="Username" />
      </mp-form-item>
      <mp-form-item field="password" :rules="[(value) => !!value || 'Password is required']">
        <mp-input v-model="formData.password" type="password" placeholder="Password" />
      </mp-form-item>
      <mp-space>
        <mp-button status="primary" native-type="submit">Submit</mp-button>
        <mp-button native-type="reset">Reset</mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
</template>
