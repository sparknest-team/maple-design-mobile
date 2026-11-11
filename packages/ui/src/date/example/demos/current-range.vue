<script setup lang="ts">
import { ref } from 'vue'

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const selected = ref(yesterday)
const showCurrent = ref(true)
const showNowButton = ref(true)
const range = ref(['2025-01-05 09:00', '2025-01-10 18:00'])
</script>
<template>
  <div>
    <p>今日高亮和选择当前是两个独立功能。</p>
    <mp-checkbox v-model="showCurrent">今日高亮</mp-checkbox>
    <mp-checkbox v-model="showNowButton">选择当前按钮</mp-checkbox>
    <mp-date-picker
      v-model="selected"
      value-format="Date"
      :default-picker-value="new Date()"
      :show-current="showCurrent"
      :show-now-button="showNowButton"
      :disable-confirm="false"
      presentation="calendar"
    />
    <p>确认后选中：{{ selected }}</p>
    <p>切换顶部摘要修改起止值；结束早于开始时，底部提示并禁用确认。</p>
    <mp-date-range-picker
      v-model="range"
      show-time
      :time-fields="['hour', 'minute']"
      format="YYYY-MM-DD HH:mm"
      value-format="YYYY-MM-DD HH:mm"
      :disable-confirm="false"
      presentation="calendarPicker"
    />
    <p>确认后范围：{{ range }}</p>
  </div>
</template>
