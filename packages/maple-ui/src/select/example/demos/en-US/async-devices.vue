<script setup lang="ts">
import { ref } from 'vue'

const presentation = ref<'menu' | 'list' | 'picker'>('menu')
const value = ref([2])
const options = ref<{ id: number; name: string; disabled?: boolean }[]>([])
const loading = ref(false)
async function load() {
  loading.value = true
  try {
    options.value = await Promise.resolve(
      Array.from({ length: 200 }, (_, index) => ({
        id: index + 1,
        name: `Device ${index + 1}`,
        disabled: index === 3,
      })),
    )
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <mp-space direction="column" :size="16">
    <label
      >Presentation
      <select v-model="presentation">
        <option>menu</option>
        <option>list</option>
        <option>picker</option>
      </select>
    </label>
    <mp-button @click="load">Load devices</mp-button>
    <mp-select
      v-model="value"
      :presentation="presentation"
      :options="options"
      :loading="loading"
      :field-names="{ label: 'name', value: 'id' }"
      :virtual-list-props="{ height: 180 }"
      :limit="3"
      multiple
      filterable
      clearable
      placeholder="Choose up to three devices"
    />
    <p>Committed IDs: {{ value }}. IDs display before loading; labels resolve automatically afterwards.</p>
  </mp-space>
</template>
