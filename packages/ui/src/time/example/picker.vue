<script setup>
import { reactive } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { t } from './locale'

const dates = reactive({
  date: '11:20',
  date1: '15:10',
  date2: '07:10',
  date3: '07:10:12',
  date4: '05:10',
  date5: '17:36:22',
  date6: '17:36:22',
})

const disabledHours = () => Array.from({ length: 24 }, (_, hour) => hour).filter((hour) => hour % 2 !== 0)
const disabledMinutes = (hour) => (hour === 10 ? [0, 15, 45] : [])
const disabledSeconds = (hour, minute) => (hour === 10 && minute === 30 ? [41, 43, 45] : [])

onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-time-picker v-model="dates.date" format="HH:mm" />
  <app-type>{{ t('hour24') }}</app-type>
  <mp-time-picker v-model="dates.date1" format="HH:mm" />

  <app-type>{{ t('showSecond') }}</app-type>
  <mp-time-picker v-model="dates.date5" format="HH:mm:ss" />

  <app-type>{{ t('readonly') }}</app-type>
  <mp-time-picker v-model="dates.date2" format="HH:mm" readonly />

  <app-type>{{ t('timeLimit') }}</app-type>
  <mp-time-picker
    v-model="dates.date3"
    format="HH:mm:ss"
    min="2:28:38"
    max="19:40:22"
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    :disabled-seconds="disabledSeconds"
  />

  <app-type>{{ t('actions') }}</app-type>
  <mp-time-picker v-model="dates.date6" format="HH:mm">
    <template #actions="{ confirm, canConfirm }">
      <mp-button status="primary" variant="text" :disabled="!canConfirm" @click="confirm">确认</mp-button>
    </template>
  </mp-time-picker>
</template>
