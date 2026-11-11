<script setup>
import { ref } from 'vue'

const control = ref()
const value = ref(false)
const selected = ref([0])
</script>
<template>
  <mp-space direction="column">
    <p>Boolean models emit booleans; array models use value as the option ID. Current value:{{ value }}</p>
    <mp-checkbox ref="control" v-model="value">Enable notifications</mp-checkbox>
    <mp-space wrap>
      <mp-button size="sm" @click="control?.toggle()">Toggle selection</mp-button>
      <mp-button size="sm" @click="control?.focus()">Focus</mp-button>
      <mp-button size="sm" @click="value = false">Reset</mp-button>
    </mp-space>
    <p>Array model:{{ selected }}</p>
    <mp-checkbox v-model="selected" :value="0">Number 0</mp-checkbox>
    <mp-checkbox v-model="selected" :value="false">Boolean false</mp-checkbox>
    <p>
      Read-only controls can receive focus; disabled controls cannot be edited. Enter/Space activates only this control.
    </p>
    <mp-checkbox :default-value="true" readonly>Read only</mp-checkbox>
    <mp-checkbox :default-value="true" disabled>Disabled</mp-checkbox>
  </mp-space>
</template>
