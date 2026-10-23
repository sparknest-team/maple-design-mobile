<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('inline')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  datetime: '2026-10-20 09:30:00',
  dateTimes: ['2026-10-20 09:30:00', '2026-10-22 18:00:00'],
  day: '2026-10-19',
  days: ['2026-10-19', '2026-10-22'],
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="day" label="日期"
        ><mp-date v-model="model.day" value-format="YYYY-MM-DD" panel-type="calendar"
      /></mp-form-item>
      <mp-form-item field="days" label="日期范围"
        ><mp-date-range v-model="model.days" value-format="YYYY-MM-DD" panel-type="calendar"
      /></mp-form-item>
      <mp-form-item field="datetime" label="日期时间"
        ><mp-date v-model="model.datetime" show-time panel-type="calendarPicker"
      /></mp-form-item>
      <mp-form-item field="dateTimes" label="日期时间范围"
        ><mp-date-range v-model="model.dateTimes" show-time panel-type="calendarPicker"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
