<template>
  <mp-auto-complete
    v-model="value"
    :options="options"
    :field-names="{ value: 'code', label: 'name', disabled: 'unavailable' }"
    placeholder="Type a city"
    style="width: 100%; max-width: 320px"
  >
    <template #option="{ data }">{{ data.label }} · {{ data.raw.country }}</template>
    <template #footer>
      <div style="padding: 6px 12px; color: var(--mp-sys-color-content-tertiary)">
        Choose a suggestion or continue typing
      </div>
    </template>
  </mp-auto-complete>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { code: 'PEK', name: 'Beijing', country: 'CN' },
  { code: 'SHA', name: 'Shanghai', country: 'CN' },
  { code: 'NRT', name: 'Tokyo', country: 'JP', unavailable: true },
]
</script>
