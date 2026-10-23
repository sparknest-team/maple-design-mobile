<script setup>
import { ref } from 'vue'

const value = ref(['09:30', '18:00'])
const immediate = ref(false)
const readonly = ref(false)
const confirmations = ref(0)
const hideDisabled = ref(false)
const disabledHours = () => [0, 1, 2, 3, 4, 5, 6, 7]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <mp-checkbox v-model="immediate">Commit without confirmation</mp-checkbox>
    <mp-checkbox v-model="hideDisabled">Hide disabled hours (00–07)</mp-checkbox>
    <mp-checkbox v-model="readonly">Read only (draft cannot be submitted)</mp-checkbox>
    <mp-button variant="outline" @click="value = ['11:00', '20:00']">Replace value externally</mp-button>
    <mp-time-range-picker
      v-model="value"
      format="HH:mm"
      :disable-confirm="immediate"
      :readonly="readonly"
      :hide-disabled-options="hideDisabled"
      :disabled-hours="disabledHours"
      @confirm="confirmations++"
    >
      <template #extra><p>The paired wheels share one draft and confirmation.</p></template>
    </mp-time-range-picker>
    <span>Valid confirmations: {{ confirmations }}</span>
    <span>Committed value: {{ value }}</span>
    <p>With confirmation enabled, selection only changes the draft. The value above changes after confirmation.</p>
  </div>
</template>
