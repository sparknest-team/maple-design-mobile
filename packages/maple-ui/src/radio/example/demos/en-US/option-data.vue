<script setup lang="ts">
import { h, ref } from 'vue'

const value = ref<string | number | boolean | null>(null)
const fields = { value: 'id', label: 'name', disabled: 'unavailable', readonly: 'locked' }
const options = ref([
  { id: false, name: 'Boolean false' },
  { id: 0, name: 'Number zero' },
  { id: '', name: 'Empty string' },
  { id: 'locked', name: 'Read-only option', locked: true },
  { id: 'disabled', name: 'Disabled option', unavailable: true },
])
const renderOptions = [
  {
    value: 'render',
    label: (_data: unknown, checked: boolean) => h('strong', checked ? 'Selected' : 'Rendered label'),
  },
]
</script>

<template>
  <section class="option-demo">
    <p>Field mapping and label slots. Read-only options can receive focus; disabled options cannot be edited.</p>
    <mp-radio-group v-model="value" :options="options" :field-names="fields" orientation="vertical">
      <template #label="{ data, checked }">{{ data.label }} {{ checked ? '✓' : '' }}</template>
    </mp-radio-group>
    <p>Current value: {{ JSON.stringify(value) }}</p>
    <mp-button @click="value = null">Clear</mp-button>
    <p>
      Labels also support render functions. Omitting options uses the default slot; passing [] renders an empty group.
    </p>
    <mp-radio-group :options="renderOptions" />
  </section>
</template>

<style scoped>
.option-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.option-demo p {
  margin: 0;
}
</style>
