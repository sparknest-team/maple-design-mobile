<script setup>
import { ref } from 'vue'

const value = ref('09:30')
const immediate = ref(false)
const confirmations = ref(0)
const hideDisabled = ref(false)
const readonly = ref(false)
const disabledHours = () => [0, 1, 2, 3, 4, 5, 6, 7]
</script>

<template>
  <mp-space direction="column" size="12px" style="width: 100%">
    <mp-checkbox v-model="immediate">Commit without confirmation</mp-checkbox>
    <mp-checkbox v-model="hideDisabled">Hide disabled hours (00–07)</mp-checkbox>
    <mp-checkbox v-model="readonly">Read-only (including confirmation)</mp-checkbox>
    <mp-button variant="outline" @click="value = '13:45'">Replace externally with 13:45</mp-button>
    <mp-time-picker
      v-model="value"
      format="HH:mm"
      :disable-confirm="immediate"
      :hide-disabled-options="hideDisabled"
      :readonly="readonly"
      :disabled-hours="disabledHours"
      @confirm="confirmations++"
    >
      <template #extra><p>Changing presentation keeps the draft; extra content uses the same slot.</p></template>
    </mp-time-picker>
    <span>Valid confirmations: {{ confirmations }}</span>
    <span>Committed value: {{ value }}</span>
    <p>With confirmation enabled, selection only changes the draft. The value above changes after confirmation.</p>
  </mp-space>
</template>
