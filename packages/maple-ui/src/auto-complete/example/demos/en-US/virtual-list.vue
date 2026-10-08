<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = Array.from({ length: 500 }, (_, index) => ({
  value: `device-${index + 1}`,
  label: `Device ${index + 1}`,
}))
</script>
<template>
  <mp-auto-complete
    v-model="value"
    :options="options"
    :should-open="() => true"
    :virtual-list-props="{ height: 180 }"
    placeholder="Search 500 devices"
  />
</template>
