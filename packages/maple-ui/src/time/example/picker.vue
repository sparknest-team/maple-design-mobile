<script setup>
import { reactive } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const dates = reactive({
  date: '11:20',
  clock: '11:20',
  date1: '15:10',
  date2: '07:10',
  date3: '07:10:12',
  date4: '05:10',
  date5: '17:36:22',
  date6: '17:36:22',
})

const disabledTime = {
  hours: (hour) => hour % 2 !== 0,
  minutes: (minute) => minute % 15 !== 0,
  seconds: (second) => second % 2 !== 0,
}

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-time-picker v-model="dates.date" />

  <app-type>{{ t('clockMode') }}</app-type>
  <mp-time-picker v-model="dates.clock" presentation="clock" />

  <app-type>{{ t('hour24') }}</app-type>
  <mp-time-picker v-model="dates.date1" presentation="clock" format="24hr" />

  <app-type>{{ t('showSecond') }}</app-type>
  <mp-time-picker v-model="dates.date5" presentation="clock" format="24hr" use-seconds />

  <app-type>{{ t('readonly') }}</app-type>
  <mp-time-picker v-model="dates.date2" presentation="clock" readonly />

  <app-type>{{ t('timeLimit') }}</app-type>
  <mp-time-picker
    v-model="dates.date3"
    presentation="clock"
    format="24hr"
    use-seconds
    min="2:28:38"
    max="19:40:22"
    :disabled-time="disabledTime"
  />

  <app-type>{{ t('actions') }}</app-type>
  <mp-time-picker v-model="dates.date6" presentation="clock">
    <template #actions>
      <mp-space size="sm">
        <mp-button status="primary" variant="text">{{ t('action') }}</mp-button>
        <mp-button status="primary" variant="text">{{ t('action') }}</mp-button>
      </mp-space>
    </template>
  </mp-time-picker>
</template>
