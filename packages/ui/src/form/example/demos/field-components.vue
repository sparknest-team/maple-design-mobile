<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const editMode = ref('popup')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  name: '表单输入示例',
  notes: '每个字段都继承上方的展示与触发方式',
  count: 3,
  code: '123456',
})
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="字段展示方式">
      <mp-radio-group
        v-model="editMode"
        aria-label="字段展示方式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form :model="model" :edit-mode="editMode">
      <mp-form-item field="name" label="单行文本"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="notes" label="多行文本"><mp-textarea v-model="model.notes" /></mp-form-item>
      <mp-form-item field="count" label="数量"
        ><mp-input-number v-model="model.count" :min="0" :max="100"
      /></mp-form-item>
      <mp-form-item field="code" label="验证码"><mp-verification-code v-model="model.code" :length="6" /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
