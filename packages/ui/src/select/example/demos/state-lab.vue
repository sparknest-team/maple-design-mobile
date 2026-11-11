<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('design')
const options = [
  { label: '研发', value: 'dev' },
  { label: '设计', value: 'design' },
  { label: '运营', value: 'ops', disabled: true },
]
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-select v-model="value" :options="options" clearable v-bind="__demoState"></mp-select>
  </mp-space>
</template>
