<script setup lang="ts">
import { ref } from 'vue'

const editMode = ref<'direct' | 'popup'>('popup')
const value = ref([2])
const options = ref<{ id: number; name: string; disabled?: boolean }[]>([])
const loading = ref(false)
const notice = ref('')
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
    <mp-radio-group v-model="editMode" aria-label="Presentation">
      <mp-radio value="inline">inline</mp-radio>
      <mp-radio value="popup">popup</mp-radio>
    </mp-radio-group>
    <mp-button @click="load">Load devices</mp-button>
    <mp-select
      v-model="value"
      :edit-mode="editMode"
      :options="options"
      :loading="loading"
      :field-names="{ label: 'name', value: 'id' }"
      :virtual-list-props="{ height: 180 }"
      :limit="3"
      multiple
      filterable
      clearable
      placeholder="Choose up to three devices"
      @exceed-limit="notice = 'Choose at most three devices. Remove one before adding another.'"
      @change="notice = ''"
    />
    <p role="note">
      {{
        editMode === 'popup'
          ? 'Check devices, then Confirm to save. Cancel discards the draft.'
          : 'Menu selections save immediately. Device 4 is disabled.'
      }}
    </p>
    <p role="status" aria-live="polite">{{ notice || `Selected: ${value.length} / 3` }}</p>
    <p>Committed IDs: {{ value }}. IDs display before loading; labels resolve automatically afterwards.</p>
  </mp-space>
</template>
