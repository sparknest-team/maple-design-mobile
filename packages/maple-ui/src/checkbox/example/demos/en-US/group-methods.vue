<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupInstance } from '@maple-design/ui'

const group = ref<CheckboxGroupInstance>()
const value = ref<Array<string | number | boolean>>(['remote', 'locked', 'a'])
const reverse = ref(false)
const proposal = ref<Array<string | number | boolean>>([])
const options = [
  { value: 'a', label: 'Task A' },
  { value: 'b', label: 'Task B' },
  { value: 'c', label: 'Task C' },
  { value: 'locked', label: 'Read-only, selection preserved', readonly: true },
  { value: 'disabled', label: 'Disabled, excluded from bulk changes', disabled: true },
]
</script>

<template>
  <section class="group-methods-demo">
    <p>
      Select up to 4 values, including the unloaded remote value. Bulk operations preserve read-only and unloaded
      selections.
    </p>
    <mp-checkbox-group
      ref="group"
      v-model="value"
      :options="reverse ? [...options].reverse() : options"
      :max="4"
      orientation="vertical"
    />
    <mp-space wrap>
      <mp-button @click="proposal = group?.checkAll() ?? []">Check all</mp-button>
      <mp-button @click="proposal = group?.inverseAll() ?? []">Invert</mp-button>
      <mp-button @click="reverse = !reverse">Reverse option order</mp-button>
    </mp-space>
    <p>Current value: {{ JSON.stringify(value) }}</p>
    <p>Returned proposal: {{ JSON.stringify(proposal) }}</p>
  </section>
</template>

<style scoped>
.group-methods-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.group-methods-demo p {
  margin: 0;
}
</style>
