<script setup>
import { reactive } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import { t, use } from './locale'

const ranges = reactive({
  basic: ['2024-01-01', '2024-01-15'],
  calendar: ['2024-01-01', '2024-12-31'],
  dateTimeCalendarPicker: ['2025-01-15 10:29', '2025-01-16 11:29'],
  dateTimePicker: ['2025-01-15 10:29', '2025-01-16 11:29'],
  year: ['2020', '2024'],
  month: ['2024-01', '2024-06'],
  readonly: ['2024-01-01', '2024-01-15'],
})

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-date-range-picker v-model="ranges.basic" />

  <app-type>{{ t('calendarMode') }}</app-type>
  <mp-date-range-picker v-model="ranges.calendar" presentation="calendar" />

  <app-type>{{ t('dateTimeCalendarPicker') }}</app-type>
  <mp-date-range-picker
    v-model="ranges.dateTimeCalendarPicker"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
    presentation="calendarPicker"
  />

  <app-type>{{ t('dateTimePicker') }}</app-type>
  <mp-date-range-picker
    v-model="ranges.dateTimePicker"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
    presentation="picker"
  />

  <app-type>{{ t('yearRange') }}</app-type>
  <mp-date-range-picker v-model="ranges.year" presentation="picker" type="year" />

  <app-type>{{ t('monthRange') }}</app-type>
  <mp-date-range-picker v-model="ranges.month" presentation="picker" type="month" />

  <app-type>{{ t('readonly') }}</app-type>
  <mp-date-range-picker v-model="ranges.readonly" readonly />
</template>
