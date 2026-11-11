<script setup>
import { reactive } from 'vue'

const formData = reactive({ username: '', password: '' })
</script>

<template>
  <mp-form :model="formData">
    <mp-form-item field="username" required :rules="[(value) => !!value || '用户名不能为空']">
      <mp-input v-model="formData.username" placeholder="用户名" />
    </mp-form-item>
    <mp-form-item field="password" :rules="[(value) => !!value || '密码不能为空']">
      <mp-input v-model="formData.password" type="password" placeholder="密码" />
    </mp-form-item>
  </mp-form>
</template>
