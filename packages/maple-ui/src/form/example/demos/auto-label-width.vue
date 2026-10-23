<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ name: '', department: '', contact: '' })
const showExtra = ref(true)
const label = ref('联系方式')
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>自动对齐最长的可见标签。试着修改标签或移除额外字段。</p>
    <mp-checkbox v-model="showExtra">显示额外字段</mp-checkbox>
    <label>修改最长标签 <mp-input v-model="label" /></label>
    <mp-form :model="model" layout="horizontal" auto-label-width label-align="left">
      <mp-form-item field="name" label="姓名"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="department" label="部门"><mp-input v-model="model.department" /></mp-form-item>
      <mp-form-item v-if="showExtra" field="contact" :label="label">
        <mp-input v-model="model.contact" />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
