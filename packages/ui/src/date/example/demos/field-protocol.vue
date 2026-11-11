<script setup>
import { ref } from 'vue'

const disabled = ref(false)
const date = ref('2026-09-22')
const dateRange = ref(['2026-09-22', '2026-09-24'])
const time = ref('09:00')
const timeRange = ref(['23:00', '01:00'])
</script>

<template>
  <mp-space direction="column">
    <p>范围字段：点击右侧输入可从结束端选择；面板切换起止端只修改草稿，确认后写回。</p>
    <span>禁用字段</span>
    <mp-switch v-model="disabled" aria-label="禁用字段" />
    <mp-date v-model="date" :disabled="disabled" clearable placeholder="日期" />
    <mp-date-range v-model="dateRange" :disabled="disabled" clearable placeholder="日期范围" />
    <mp-time v-model="time" format="HH:mm" :disabled="disabled" clearable placeholder="时间" />
    <mp-time-range
      v-model="timeRange"
      format="HH:mm"
      :disabled="disabled"
      clearable
      show-next-day
      placeholder="时间范围"
    />
    <p>日期：{{ date || '未选择' }}；日期范围：{{ dateRange }}</p>
    <p>时间：{{ time || '未选择' }}；时间范围：{{ timeRange }}</p>
  </mp-space>
</template>
