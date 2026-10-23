<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(['09:30', '18:00'])
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-time-range v-model="value" format="HH:mm" v-bind="__demoState"></mp-time-range>
  </mp-space>
</template>
