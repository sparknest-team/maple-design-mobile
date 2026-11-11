<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('2026-10-23')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-date v-model="value" value-format="YYYY-MM-DD" v-bind="__demoState"></mp-date>
  </mp-space>
</template>
