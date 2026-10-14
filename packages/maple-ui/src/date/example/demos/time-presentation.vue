<script setup lang="ts">
import { ref } from 'vue'

const use12Hours = ref(true)
const timeOptions = { step: { minute: 15 }, hideDisabledOptions: true }
</script>

<template>
  <mp-checkbox v-model="use12Hours">十二小时展示</mp-checkbox>
  <p>点击日期下方的时间入口，查看时钟。下方滚轮单独展示列尺寸设置。</p>
  <mp-date-picker
    model-value="2025-01-05 13:30"
    show-time
    :use-seconds="false"
    presentation="calendarClock"
    :time-picker-props="{ ...timeOptions, use12Hours }"
  />
  <mp-date-picker presentation="picker" :picker-props="{ optionHeight: 36, optionCount: 4 }" />
</template>
