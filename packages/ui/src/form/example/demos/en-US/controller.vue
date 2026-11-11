<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({ username: '' })
const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
</script>

<template>
  <mp-form ref="form" :model="formData" :disabled="disabled" :readonly="readonly">
    <mp-form-item field="username" :rules="[(value) => !!value || 'Username is required']">
      <mp-input v-model="formData.username" placeholder="Username" />
    </mp-form-item>
  </mp-form>
  <mp-space direction="column" :size="[14, 0]">
    <mp-button block status="danger" @click="form?.resetFields()">Reset fields</mp-button>
    <mp-button block status="warning" @click="form?.clearValidate()">Clear validation</mp-button>
    <mp-button block status="success" @click="form?.validate()">Validate</mp-button>
    <mp-button block status="info" @click="disabled = !disabled">Toggle disabled</mp-button>
    <mp-button block status="primary" @click="readonly = !readonly">Toggle readonly</mp-button>
  </mp-space>
</template>
