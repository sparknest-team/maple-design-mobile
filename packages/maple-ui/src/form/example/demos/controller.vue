<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({ username: '' })
const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
</script>

<template>
  <mp-form ref="form" :model="formData" :disabled="disabled" :readonly="readonly">
    <mp-form-item field="username" :rules="[(value) => !!value || '用户名不能为空']">
      <mp-input v-model="formData.username" placeholder="请输入用户名" />
    </mp-form-item>
  </mp-form>

  <mp-space direction="column" :size="['4vmin', 0]">
    <mp-button block status="danger" @click="form?.resetFields()">清空表单</mp-button>
    <mp-button block status="warning" @click="form?.clearValidate()">清空验证</mp-button>
    <mp-button block status="success" @click="form?.validate()">触发验证</mp-button>
    <mp-button block status="info" @click="disabled = !disabled">表单禁用</mp-button>
    <mp-button block status="primary" @click="readonly = !readonly">表单只读</mp-button>
  </mp-space>
</template>
