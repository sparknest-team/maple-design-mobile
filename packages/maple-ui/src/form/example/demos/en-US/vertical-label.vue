<script setup>
import { reactive, ref } from 'vue'

const form = ref(null)
const formData = reactive({ username: '', password: '' })
</script>

<template>
  <mp-form ref="form" :model="formData" layout="vertical">
    <mp-form-item
      field="username"
      label="Username"
      required
      :rules="[(value) => !!value || 'Username is required']"
      :validate-trigger="['input', 'change']"
    >
      <mp-input v-model="formData.username" placeholder="Please input" />
    </mp-form-item>
    <mp-form-item
      field="password"
      label="Password"
      help="At least 8 characters"
      :rules="[
        (value) => !!value || 'Password is required',
        (value) => value.length >= 8 || 'Use at least 8 characters',
      ]"
    >
      <mp-input v-model="formData.password" type="password" placeholder="Please input" />
    </mp-form-item>
    <mp-button block status="primary" @click="form?.validate()">Validate</mp-button>
  </mp-form>
</template>
