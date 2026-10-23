<script setup lang="ts">
import { ref } from 'vue'

const presentation = ref<'inline' | 'popup'>('inline')
const value = ref(['factory', 'device-2'])
const options = ref<Record<string, unknown>[]>([])
const loading = ref(false)
async function load() {
  loading.value = true
  try {
    options.value = await Promise.resolve([
      {
        id: 'factory',
        name: 'Factory',
        nodes: [
          { id: 'device-1', name: 'Device one' },
          { id: 'device-2', name: 'Device two' },
          { id: 'device-3', name: 'Unavailable device', disabled: true },
        ],
      },
    ])
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-select
      v-model="presentation"
      placeholder="Presentation"
      :clearable="false"
      hint
      :options="[
        { label: 'inline', value: 'inline' },
        { label: 'popup', value: 'popup' },
      ]"
      :style="{ width: '200px' }"
    />
    <mp-button @click="load">Load device tree</mp-button>
    <mp-cascader
      v-model="value"
      :presentation="presentation"
      :options="options"
      :loading="loading"
      path-mode
      filterable
      clearable
      :field-names="{ label: 'name', value: 'id', children: 'nodes' }"
      placeholder="Choose a device path"
    />
    <p>Committed path: {{ value }}. Labels resolve automatically after the tree loads.</p>
  </mp-space>
</template>
