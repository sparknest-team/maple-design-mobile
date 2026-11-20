<script setup>
import { computed, ref } from 'vue'

const selected = ref(['a'])
const all = computed({
  get: () => selected.value.length === 2,
  set: (value) => {
    selected.value = value ? ['a', 'b'] : []
  },
})
const indeterminate = computed(() => selected.value.length > 0 && selected.value.length < 2)
</script>
<template>
  <mp-space direction="column">
    <mp-checkbox v-model="all" :indeterminate="indeterminate"
      >Check all (mixed state derives from selected values)</mp-checkbox
    >
    <mp-checkbox-group
      v-model="selected"
      :options="[
        { label: 'Device A', value: 'a' },
        { label: 'Device B', value: 'b' },
      ]"
    />
  </mp-space>
</template>
