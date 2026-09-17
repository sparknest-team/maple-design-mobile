<script setup>
import { reactive } from 'vue'
import MpCustomFormComponent from '../CustomFormComponent.vue'

const formData = reactive({ confirmed: false })
</script>

<template>
  <mp-form :model="formData">
    <mp-form-item
      field="confirmed"
      label="确认状态"
      help="自定义控件通过 useFormItem 接入校验"
      :rules="[(value) => !!value || '请先确认']"
    >
      <mp-custom-form-component v-model="formData.confirmed">点我切换</mp-custom-form-component>
    </mp-form-item>
  </mp-form>
</template>
