<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('inline')
const timePanelType = ref('picker')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  time: '09:30',
  times: ['09:30', '18:00'],
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="time" label="时间"
        ><mp-time v-model="model.time" :panel-type="timePanelType" format="HH:mm"
      /></mp-form-item>
      <mp-form-item field="times" label="时间范围"
        ><mp-time-range v-model="model.times" :panel-type="timePanelType" format="HH:mm"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
