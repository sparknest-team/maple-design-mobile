<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(false)
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-checkbox v-model="value" v-bind="__demoState">同意条款</mp-checkbox>
  </mp-space>
</template>
