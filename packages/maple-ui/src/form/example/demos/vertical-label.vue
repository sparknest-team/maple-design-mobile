<script setup>
import { reactive, ref } from 'vue'

const form = ref(null)
const formData = reactive({ username: '', password: '' })
</script>

<template>
  <mp-form ref="form" :model="formData" layout="vertical">
    <mp-form-item
      field="username"
      label="用户名"
      required
      :rules="[(value) => !!value || '用户名不能为空']"
      :validate-trigger="['input', 'change']"
    >
      <mp-input v-model="formData.username" placeholder="请输入" />
    </mp-form-item>
    <mp-form-item
      field="password"
      label="密码"
      help="至少 8 位"
      :rules="[(value) => !!value || '密码不能为空', (value) => value.length >= 8 || '密码长度不能低于 8 位']"
    >
      <mp-input v-model="formData.password" type="password" placeholder="请输入" />
    </mp-form-item>
    <mp-button block status="primary" @click="form?.validate()">校验</mp-button>
  </mp-form>
</template>
