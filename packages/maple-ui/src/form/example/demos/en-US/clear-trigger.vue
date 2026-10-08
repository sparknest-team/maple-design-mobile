<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ keyword: 'Maple' })
const formRef = ref(null)
</script>

<template>
  <mp-form ref="formRef" :model="model">
    <mp-form-item
      field="keyword"
      label="Keyword"
      :rules="[(value) => !!value || 'Enter a keyword']"
      validate-trigger="clear"
    >
      <mp-input v-model="model.keyword" clearable placeholder="Validate immediately after clearing" />
    </mp-form-item>
    <mp-button @click="formRef?.resetFields()">Reset</mp-button>
  </mp-form>
</template>
