<script setup>
import { computed, ref } from 'vue'

const value = ref('09:30:00')
const coarse = ref(false)
const fiveHours = ref(false)
const blockAfternoon = ref(false)
const accept = ref(true)
const proposals = ref(0)
const disabledHours = () => (blockAfternoon.value ? [15] : [])
function update(next) {
  proposals.value++
  if (accept.value) {
    value.value = next
  }
}
const step = computed(() => ({ hour: fiveHours.value ? 5 : 1, minute: coarse.value ? 30 : 15, second: 10 }))
</script>

<template>
  <mp-space class="time-step-demo" direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="fiveHours">12-hour display with a 5-hour step</mp-checkbox>
    <mp-checkbox v-model="coarse">Use 30-minute intervals</mp-checkbox>
    <mp-checkbox v-model="blockAfternoon">Disable 15:00 (03 PM)</mp-checkbox>
    <mp-checkbox v-model="accept">Accept controlled updates</mp-checkbox>
    <p>Confirmation validates the current step. Changing a rule does not change the committed value.</p>
    <mp-time
      :model-value="value"
      format="HH:mm:ss"
      :use12-hours="fiveHours"
      :step="step"
      :disabled-hours="disabledHours"
      style="width: 100%; max-width: 360px"
      @update:model-value="update"
    />
    <span>{{ value }}</span>
    <span role="status">Proposals：{{ proposals }}</span>
  </mp-space>
</template>
