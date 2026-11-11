<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('design')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-radio v-model="value" value="design" v-bind="__demoState">设计</mp-radio>
  </mp-space>
</template>
