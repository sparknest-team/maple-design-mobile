<script setup lang="ts">
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const model = ref<{ days: [string, string]; months: [string, string]; years: [string, string] }>({
  days: ['2026-12-29', '2027-01-03'],
  months: ['2026-11', '2027-02'],
  years: ['2098', '2102'],
})
const disabledDay = (date: Date) => date.getFullYear() === 2027 && date.getMonth() === 0 && date.getDate() === 1
const disabledMonth = (date: Date) => date.getFullYear() === 2026 && date.getMonth() === 11
const disabledYear = (date: Date) => date.getFullYear() === 2100
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form :model="model">
      <mp-form-item field="days" label="跨月日期"
        ><mp-date-range
          v-model="model.days"
          panel-type="calendar"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledDay"
      /></mp-form-item>
      <mp-form-item field="months" label="跨年月份"
        ><mp-date-range
          v-model="model.months"
          panel-type="calendar"
          type="month"
          value-format="YYYY-MM"
          :disabled-date="disabledMonth"
      /></mp-form-item>
      <mp-form-item field="years" label="跨页年份"
        ><mp-date-range
          v-model="model.years"
          panel-type="calendar"
          type="year"
          value-format="YYYY"
          :disabled-date="disabledYear"
      /></mp-form-item>
    </mp-form>
    <ModelOutput>{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
