<script setup>
import { ref } from 'vue'

const date = ref('07:10:12')

const disabledTime = {
  hours: (hour) => hour % 2 !== 0,
  minutes: (minute) => minute % 15 !== 0,
  seconds: (second) => second % 2 !== 0,
}
</script>

<template>
  <mp-time-picker v-model="date" format="24hr" use-seconds min="2:28:38" max="19:40:22" :disabled-time="disabledTime" />
</template>
