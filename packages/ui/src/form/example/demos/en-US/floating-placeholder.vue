<script setup>
import { reactive } from 'vue'

const formData = reactive({ username: '', password: '' })
</script>

<template>
  <mp-form :model="formData">
    <mp-form-item field="username" required :rules="[(value) => !!value || 'Username is required']">
      <mp-input v-model="formData.username" placeholder="Username" />
    </mp-form-item>
    <mp-form-item field="password" :rules="[(value) => !!value || 'Password is required']">
      <mp-input v-model="formData.password" type="password" placeholder="Password" />
    </mp-form-item>
  </mp-form>
</template>
