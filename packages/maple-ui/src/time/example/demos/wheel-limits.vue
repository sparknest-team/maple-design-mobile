<script setup>
import { ref } from 'vue'

const value = ref('10:30:40')
const locked = ref(false)
const disabledHours = () => (locked.value ? Array.from({ length: 24 }, (_, hour) => hour) : [])
const disabledMinutes = (hour) => (hour === 10 ? [45] : [])
const disabledSeconds = (hour, minute) => (hour === 10 && minute === 30 ? [41, 43, 45] : [])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>可选范围 10:30:38–11:30:02。切换小时后分钟和秒联动；禁用全部小时后无法确认。</p>
    <mp-button @click="locked = !locked">{{ locked ? '恢复可选' : '禁用全部小时' }}</mp-button>
    <mp-time
      v-model="value"
      format="HH:mm:ss"
      panel-type="picker"
      min="10:30:38"
      max="11:30:02"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
