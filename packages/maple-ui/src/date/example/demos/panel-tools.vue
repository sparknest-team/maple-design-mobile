<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('2025-01-15')
const viewport = ref('2025-01-01')
const acceptNavigation = ref(true)
const shortcuts = [
  { label: '月初', value: '2025-01-01' },
  { label: '下个月', value: () => '2025-02-01' },
  { label: '不可选', value: '2025-03-01', disabled: true },
]
function navigate(value: unknown) {
  if (acceptNavigation.value && typeof value === 'string') {
    viewport.value = value
  }
}
</script>
<template>
  <div>
    <p>选择值：{{ selected }}；视口：{{ viewport }}</p>
    <mp-checkbox v-model="acceptNavigation">接受视口导航</mp-checkbox>
    <mp-date-picker
      v-model="selected"
      :picker-value="viewport"
      :shortcuts="shortcuts"
      :disable-confirm="false"
      presentation="calendar"
      @update:picker-value="navigate"
    />
    <p>范围快捷项走同一套确认与校验。</p>
    <mp-date-range-picker
      :default-value="['2025-01-10', '2025-01-15']"
      :shortcuts="[{ label: '第一周', value: ['2025-01-01', '2025-01-07'] }]"
      :disable-confirm="false"
      presentation="calendar"
    />
  </div>
</template>
