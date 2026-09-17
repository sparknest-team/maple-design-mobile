<script setup>
import { reactive } from 'vue'
import MpCustomFormComponent from '../../CustomFormComponent.vue'

const formData = reactive({ confirmed: false })
</script>

<template>
  <mp-form :model="formData">
    <mp-form-item
      field="confirmed"
      label="Confirmation"
      help="The custom control participates in validation through useFormItem"
      :rules="[(value) => !!value || 'Please confirm']"
    >
      <mp-custom-form-component v-model="formData.confirmed">Click to toggle</mp-custom-form-component>
    </mp-form-item>
  </mp-form>
</template>
