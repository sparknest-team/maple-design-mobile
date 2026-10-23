<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('inline')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  attachments: [],
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="attachments" label="附件"
        ><mp-upload v-model="model.attachments" :auto-upload="false"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
