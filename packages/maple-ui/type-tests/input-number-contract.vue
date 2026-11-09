<script setup lang="ts">
import InputNumber from '../src/input-number'

const format = (value: number | null | undefined, text: string) => text + (value ?? '')
const receive = (open: boolean) => open
const step = (value: number, direction: 'plus' | 'minus', event: Event) => [value, direction, event]
</script>
<template>
  <InputNumber
    :model-value="null"
    read-pretty
    @open-change="(open) => receive(open)"
    @step="(value, direction, event) => step(value, direction, event)"
  >
    <template #read="{ value, text }"
      ><span>{{ format(value, text) }}</span></template
    >
    <template #clear-icon="{ clear }"><button type="button" @click="clear">Clear</button></template>
  </InputNumber>
</template>
