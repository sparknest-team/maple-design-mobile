<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const allowEmpty = ref(false)
const filter = ref(true)
const shouldOpen = (text: string) => allowEmpty.value || text.length >= 2
const options = ['Cedar', 'Maple', 'Vue']
</script>
<template>
  <mp-space direction="column" size="md">
    <mp-checkbox v-model="allowEmpty">Allow opening with empty input</mp-checkbox>
    <mp-checkbox v-model="filter">Filter suggestions by input</mp-checkbox>
    <mp-auto-complete
      v-model="value"
      :options="options"
      :filter-option="filter"
      :should-open="shouldOpen"
      placeholder="Type two characters to open by default"
    />
    <p>Opening policy does not filter candidates. The menu remains closed when there are no matches.</p>
  </mp-space>
</template>
