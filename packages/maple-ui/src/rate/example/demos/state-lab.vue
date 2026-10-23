<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(3)
const __demoState = __demoReactive({ disabled: false, readonly: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
    </mp-space>
    <mp-rate v-model="value" v-bind="__demoState"></mp-rate>
  </mp-space>
</template>
