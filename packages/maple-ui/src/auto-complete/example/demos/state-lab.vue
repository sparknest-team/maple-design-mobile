<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('研发')
const options = [{ value: '研发' }, { value: '研发平台' }, { value: '设计' }]
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-auto-complete v-model="value" :options="options" clearable v-bind="__demoState"></mp-auto-complete>
  </mp-space>
</template>
