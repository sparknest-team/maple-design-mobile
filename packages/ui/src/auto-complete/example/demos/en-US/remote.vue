<template>
  <mp-auto-complete
    v-model="value"
    :options="options"
    :filter-option="false"
    placeholder="Type to request suggestions"
    style="width: 100%; max-width: 320px"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const value = ref('')
const options = ref<string[]>([])

let requestId = 0
onBeforeUnmount(() => requestId++)
const handleSearch = async (keyword: string) => {
  const current = ++requestId
  const result = await Promise.resolve(
    keyword ? Array.from({ length: 4 }, (_, index) => `${keyword}-${index + 1}`) : [],
  )
  if (current === requestId) {
    options.value = result
  }
}
</script>
