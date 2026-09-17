<script setup>
import { reactive } from 'vue'

const formData = reactive({ email: '' })
</script>

<template>
  <mp-form :model="formData">
    <mp-form-item field="email" label="邮箱" help="用于接收通知" extra="选填">
      <mp-input v-model="formData.email" placeholder="请输入" />
    </mp-form-item>
  </mp-form>
</template>
