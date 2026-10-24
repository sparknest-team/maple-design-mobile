<script setup>
import { reactive } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import { t, use } from './locale'

const ranges = reactive({
  basic: ['09:00', '18:00'],
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
  <mp-time-range-picker v-model="ranges.basic" format="HH:mm" />

  <app-type>{{ t('hour24Seconds') }}</app-type>
  <mp-time-range-picker v-model="ranges.seconds" format="HH:mm:ss" />

  <app-type>{{ t('readonly') }}</app-type>
  <mp-time-range-picker v-model="ranges.readonly" format="HH:mm" readonly />

  <app-type>{{ t('nextDay') }}</app-type>
  <mp-time-range-picker v-model="ranges.nextDay" format="HH:mm" show-next-day />

  <app-type>{{ t('actions') }}</app-type>
  <mp-time-range-picker v-model="ranges.actions" format="HH:mm">
    <template #actions="{ confirm, canConfirm }">
      <mp-button status="primary" variant="text" :disabled="!canConfirm" @click="confirm">确认</mp-button>
    </template>
  </mp-time-range-picker>
</template>
