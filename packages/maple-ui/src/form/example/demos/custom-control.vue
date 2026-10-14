<script setup>
import { reactive, ref } from 'vue'
import MpCustomFormComponent from '../CustomFormComponent.vue'

const formData = reactive({ confirmed: false })
const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
</script>

<template>
  <mp-space>
    <mp-checkbox v-model="disabled">禁用表单</mp-checkbox>
    <mp-checkbox v-model="readonly">只读字段</mp-checkbox>
  </mp-space>
  <mp-form ref="form" :model="formData" :disabled="disabled">
    <mp-form-item
      field="confirmed"
      :readonly="readonly"
      label="确认状态"
      help="自定义控件通过 useFormItem 接入校验"
      :rules="[(value) => !!value || '请先确认']"
    >
      <mp-custom-form-component v-model="formData.confirmed">点我切换</mp-custom-form-component>
    </mp-form-item>
  </mp-form>
  <mp-space>
    <mp-button @click="form?.validate()">校验</mp-button>
    <mp-button @click="form?.resetFields()">重置</mp-button>
  </mp-space>
  <p role="status">确认值：{{ formData.confirmed }}</p>
</template>
