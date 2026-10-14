<script setup>
import { reactive, ref } from 'vue'
import MpCustomFormComponent from '../../CustomFormComponent.vue'

const formData = reactive({ confirmed: false })
const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
</script>

<template>
  <mp-space>
    <mp-checkbox v-model="disabled">Disable form</mp-checkbox>
    <mp-checkbox v-model="readonly">Readonly field</mp-checkbox>
  </mp-space>
  <mp-form ref="form" :model="formData" :disabled="disabled">
    <mp-form-item
      field="confirmed"
      :readonly="readonly"
      label="Confirmation"
      help="The custom control participates in validation through useFormItem"
      :rules="[(value) => !!value || 'Please confirm']"
    >
      <mp-custom-form-component v-model="formData.confirmed">Click to toggle</mp-custom-form-component>
    </mp-form-item>
  </mp-form>
  <mp-space>
    <mp-button @click="form?.validate()">Validate</mp-button>
    <mp-button @click="form?.resetFields()">Reset</mp-button>
  </mp-space>
  <p role="status">Confirmed: {{ formData.confirmed }}</p>
</template>
