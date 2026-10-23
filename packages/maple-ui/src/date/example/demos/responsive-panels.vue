<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('2026-10-20 09:30:00')
const selectedRange = ref(['2026-10-20 09:30:00', '2026-10-22 18:00:00'])
const position = ref<'left' | 'right' | 'bottom'>('left')
const positions = ['left', 'right', 'bottom'].map((value) => ({ label: value, value }))
const types = ['date', 'month', 'year'] as const
const shortcuts = [{ label: '本月工作日范围', value: '2026-10-20 09:30:00' }]
const rangeShortcuts = [{ label: '本月工作日范围', value: ['2026-10-20 09:30:00', '2026-10-22 18:00:00'] }]
const presentation = ref<'calendarPicker' | 'calendarPicker' | 'picker'>('calendarPicker')
const presentations = ['calendarPicker', 'calendarPicker', 'picker'].map((value) => ({ label: value, value }))
</script>
<template>
  <div>
    <mp-select v-model="position" aria-label="独立面板快捷位置" :options="positions" />
    <mp-select v-model="presentation" aria-label="独立面板时间形式" :options="presentations" />
    <section v-for="type in types" :key="type" :aria-label="'独立 ' + type + ' 面板'">
      <h4>{{ type }} · DatePicker / DateRangePicker</h4>
      <mp-date-picker :type="type" :disable-confirm="false" presentation="calendar" />
      <mp-date-range-picker :type="type" :disable-confirm="false" presentation="calendar" />
    </section>
    <section aria-label="独立日期时间面板">
      <h4>DatePicker · 时间与快捷项</h4>
      <mp-date-picker
        v-model="selected"
        show-time
        :shortcuts="shortcuts"
        :shortcuts-position="position"
        :disable-confirm="false"
        :presentation="presentation"
      />
    </section>
    <p role="status" aria-label="独立日期时间已提交">{{ selected }}</p>
    <section aria-label="独立日期时间范围面板">
      <h4>DateRangePicker · 时间与快捷项</h4>
      <mp-date-range-picker
        v-model="selectedRange"
        show-time
        :shortcuts="rangeShortcuts"
        :shortcuts-position="position"
        :disable-confirm="false"
        :presentation="presentation"
      />
    </section>
    <p role="status" aria-label="独立日期时间范围已提交">{{ selectedRange }}</p>
  </div>
</template>
