<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const editMode = ref('popup')
const timePanelType = ref('picker')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  time: '09:30',
  times: ['09:30', '18:00'],
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
