<script setup>
import { reactive } from 'vue'
import { Message } from '@maplejs/maple-ui'

const formData = reactive({ username: '', password: '' })

function handleSubmit(valid) {
  Message(`提交结果：${valid ? '通过' : '未通过'}`)
}

function handleReset() {
  Message('表单已重置')
}
</script>

<template>
  <mp-form :model="formData" @submit="handleSubmit" @reset="handleReset">
    <mp-space direction="column" :size="[14, 0]">
      <mp-form-item field="username" :rules="[(value) => !!value || '用户名不能为空']">
        <mp-input v-model="formData.username" placeholder="请输入用户名" />
      </mp-form-item>
      <mp-form-item field="password" :rules="[(value) => !!value || '密码不能为空']">
        <mp-input v-model="formData.password" type="password" placeholder="请输入密码" />
      </mp-form-item>
      <mp-space>
        <mp-button status="primary" native-type="submit">提交</mp-button>
        <mp-button native-type="reset">重置</mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
</template>
