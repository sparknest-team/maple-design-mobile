<script setup>
import { ref } from 'vue'

const value = ref(['09:00', '10:00'])
const open = ref(false)
const acceptValue = ref(true)
const acceptOpen = ref(true)
const acceptClose = ref(true)
const commits = ref(0)
const proposal = ref()
const openProposal = ref()
const updateValue = (next) => {
  proposal.value = next
  if (acceptValue.value) {
    value.value = next
  }
}
const updateOpen = (next) => {
  openProposal.value = next
  if (acceptOpen.value && (next || acceptClose.value)) {
    open.value = next
  }
}
</script>

<template>
  <mp-space direction="column" size="12px" style="width: 100%">
    <p>Uncontrolled initial value</p>
    <mp-time-range :default-value="['09:00', '10:00']" format="HH:mm" clearable />
    <p>Controlled value and visibility</p>
    <mp-checkbox v-model="acceptValue">Accept value updates</mp-checkbox>
    <mp-checkbox v-model="acceptOpen">Accept visibility updates</mp-checkbox>
    <mp-time-range
      :model-value="value"
      :open="open"
      format="HH:mm"
      clearable
      @update:model-value="updateValue"
      @update:open="updateOpen"
      @change="commits++"
    />
    <span>{{ value }} / {{ open }}</span>
    <mp-checkbox v-model="acceptClose">Accept close requests</mp-checkbox>
    <output aria-label="Commit count">{{ commits }}</output>
    <output aria-label="Controlled proposals">{{ JSON.stringify({ value: proposal, open: openProposal }) }}</output>
  </mp-space>
</template>
