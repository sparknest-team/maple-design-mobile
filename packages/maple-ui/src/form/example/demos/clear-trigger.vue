<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ keyword: 'Maple' })
const formRef = ref(null)
</script>

<template>
  <mp-form ref="formRef" :model="model">
    <mp-form-item
      field="keyword"
      label="关键词"
      :rules="[(value) => !!value || '请输入关键词']"
      validate-trigger="clear"
    >
      <mp-input v-model="model.keyword" clearable placeholder="清空后立即校验" />
    </mp-form-item>
    <mp-button @click="formRef?.resetFields()">重置</mp-button>
  </mp-form>
</template>
