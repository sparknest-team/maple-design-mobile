<script setup>
import { ref } from 'vue'

const value = ref(['2026-09-22', '2026-09-24'])
const open = ref(false)
const closeRequests = ref(0)
const commits = ref(0)

function requestOpen(next) {
  if (next) {
    open.value = true
  } else {
    closeRequests.value++
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <p>
      The parent rejects close requests. Changing the range starts a new confirmation; repeated confirmation does not
      submit twice.
    </p>
    <mp-date-range
      v-model="value"
      :open="open"
      presentation="calendar"
      @update:open="requestOpen"
      @change="commits++"
    />
    <span data-test="date-range-transaction-state"
      >Value: {{ value.join(' ~ ') }}; commits: {{ commits }}; rejected closes: {{ closeRequests }}</span
    >
    <mp-button @click="open = false">Allow close</mp-button>
  </div>
</template>
