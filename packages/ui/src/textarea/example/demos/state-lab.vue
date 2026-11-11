<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('这是一段可以编辑的多行内容。')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-textarea v-model="value" v-bind="__demoState"></mp-textarea>
  </mp-space>
</template>
