<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2026-09-10')
const month = ref('2026-09')
const range = ref(['09-10', '10-10'])
const hiddenYearDate = ref('2024-02-28')
const hiddenYearRange = ref(['2024-02-28', '2024-03-01'])
</script>
<template>
  <mp-space direction="column">
    <mp-date v-model="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
    <p>String: {{ JSON.stringify(date) }}</p>
    <mp-date v-model="month" type="month" format="YYYY-MM" value-format="YYYY-MM" />
    <p>Month string: {{ JSON.stringify(month) }}</p>
    <mp-date
      v-model="hiddenYearDate"
      panel-type="picker"
      :date-fields="['month', 'day']"
      format="MM-DD"
      value-format="YYYY-MM-DD"
    />
    <p>Full date, year retained: {{ JSON.stringify(hiddenYearDate) }}</p>
    <mp-date-range
      v-model="hiddenYearRange"
      panel-type="picker"
      :date-fields="['month', 'day']"
      format="MM-DD"
      value-format="YYYY-MM-DD"
    />
    <p>Full range, years retained: {{ JSON.stringify(hiddenYearRange) }}</p>
    <mp-date-range
      v-model="range"
      panel-type="picker"
      :date-fields="['month', 'day']"
      format="MM-DD"
      value-format="MM-DD"
    />
    <p>Month/day array: {{ JSON.stringify(range) }}</p>
  </mp-space>
</template>
