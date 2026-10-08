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
    <label><input v-model="allowEmpty" type="checkbox" /> Allow opening with empty input</label>
    <label><input v-model="filter" type="checkbox" /> Filter suggestions by input</label>
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
