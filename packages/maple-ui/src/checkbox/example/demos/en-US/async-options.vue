<script setup>
import { ref } from 'vue'

const value = ref(['remote'])
const options = ref([])
async function load() {
  options.value = await Promise.resolve([
    { label: 'Remote device', value: 'remote' },
    { label: 'Device A', value: 'a' },
    { label: 'Disabled device', value: 'locked', disabled: true },
  ])
}
</script>

<template>
  <mp-space direction="column">
    <p>Values survive loading and removing options:{{ value }}</p>
    <mp-space>
      <mp-button size="sm" @click="load">Load options</mp-button>
      <mp-button size="sm" @click="options = []">Remove options</mp-button>
    </mp-space>
    <mp-checkbox-group v-model="value" :options="options" :max="2" />
  </mp-space>
</template>
