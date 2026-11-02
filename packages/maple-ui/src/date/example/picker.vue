<script setup>
import { reactive } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import { t, use } from './locale'

const dates = reactive({
  date: '2021-04',
  date1: '2021-04-08',
  calendar: '2021-04-08',
  date2: ['', ''],
  date3: ['2021-02-01', '2021-02-15'],
  date4: '2020-11-11',
  date5: '2021-05',
  dateTimeCalendarPicker: '2025-01-15 10:29',
  dateTimePicker: '2025-01-15 10:29',
})

watchLang(use)
onThemeChange()

const disabledDate = (date) => date.getDate() % 2 === 0
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-date-picker v-model="dates.date1" />

  <app-type>{{ t('calendarMode') }}</app-type>
  <mp-date-picker v-model="dates.calendar" presentation="calendar" />

  <app-type>{{ t('monthPicker') }}</app-type>
  <mp-date-picker v-model="dates.date" type="month" />

  <app-type>{{ t('multiple') }}</app-type>
  <mp-date-picker v-model="dates.date2" type="date" multiple />

  <app-type>{{ t('range') }}</app-type>
  <mp-date-picker v-model="dates.date3" type="date" range />

  <app-type>{{ t('dateTimeCalendarPicker') }}</app-type>
  <mp-date-picker
    v-model="dates.dateTimeCalendarPicker"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
    presentation="calendarPicker"
  />

  <app-type>{{ t('dateTimePicker') }}</app-type>
  <mp-date-picker
    v-model="dates.dateTimePicker"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
    presentation="picker"
  />

  <app-type>{{ t('dateLimit') }}</app-type>
  <mp-date-picker v-model="dates.date4" type="date" min="2020-10-15" max="2021-01-15" :disabled-date="disabledDate" />
</template>
