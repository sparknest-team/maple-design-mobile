<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const squareValue = ref('')
const __demoState = __demoReactive({ disabled: false, readonly: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
    </mp-space>
    <mp-search v-model="squareValue" placeholder="搜索" shape="square" v-bind="__demoState" />
  </mp-space>
</template>
