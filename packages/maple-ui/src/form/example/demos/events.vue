<script setup>
import { reactive, ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const formData = reactive({ username: '', password: '' })
const result = ref('尚未提交')

function handleSubmit({ errors }) {
  result.value = errors ? '未通过' : '通过'
  Message(`提交结果：${errors ? '未通过' : '通过'}`)
}

function handleReset() {
  result.value = '已重置'
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
        <mp-button status="primary" html-type="submit">提交</mp-button>
        <mp-button html-type="reset">重置</mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
  <p role="status">提交结果：{{ result }}</p>
  <pre>{{ formData }}</pre>
</template>
