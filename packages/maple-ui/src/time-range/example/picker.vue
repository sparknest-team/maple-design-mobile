<script setup>
import { reactive } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const ranges = reactive({
  basic: ['09:00', '18:00'],
  clock: ['09:00', '18:00'],
  seconds: ['09:00:00', '18:00:00'],
  readonly: ['09:00', '18:00'],
  nextDay: ['22:00', '06:00'],
  actions: ['09:00', '18:00'],
})

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-time-range-picker v-model="ranges.basic" />

  <app-type>{{ t('clockMode') }}</app-type>
  <mp-time-range-picker v-model="ranges.clock" presentation="clock" format="24hr" />

  <app-type>{{ t('hour24Seconds') }}</app-type>
  <mp-time-range-picker v-model="ranges.seconds" format="24hr" use-seconds />

  <app-type>{{ t('readonly') }}</app-type>
  <mp-time-range-picker v-model="ranges.readonly" readonly />

  <app-type>{{ t('nextDay') }}</app-type>
  <mp-time-range-picker v-model="ranges.nextDay" show-next-day format="24hr" />

  <app-type>{{ t('actions') }}</app-type>
  <mp-time-range-picker v-model="ranges.actions">
    <template #actions>
      <mp-space size="sm">
        <mp-button status="primary" variant="text">{{ t('action') }}</mp-button>
        <mp-button status="primary" variant="text">{{ t('action') }}</mp-button>
      </mp-space>
    </template>
  </mp-time-range-picker>
</template>
