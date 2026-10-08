<script setup>
import { ref } from 'vue'

const value = ref(['09:30', '18:00'])
const immediate = ref(false)
const readonly = ref(false)
const confirmations = ref(0)
const hideDisabled = ref(false)
const presentation = ref('picker')
const disabledHours = () => [0, 1, 2, 3, 4, 5, 6, 7]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <label><input v-model="immediate" type="checkbox" /> Commit without confirmation</label>
    <label><input v-model="hideDisabled" type="checkbox" /> Hide disabled hours (00–07)</label>
    <label
      >Presentation
      <select v-model="presentation">
        <option value="picker">Wheel</option>
        <option value="clock">Clock</option>
      </select></label
    >
    <label><input v-model="readonly" type="checkbox" /> Read only (draft cannot be submitted)</label>
    <mp-button variant="outline" @click="value = ['11:00', '20:00']">Replace value externally</mp-button>
    <mp-time-range-picker
      v-model="value"
      format="HH:mm"
      :disable-confirm="immediate"
      :readonly="readonly"
      :hide-disabled-options="hideDisabled"
      :disabled-hours="disabledHours"
      :presentation="presentation"
      @confirm="confirmations++"
    >
      <template #extra><p>Changing presentation keeps the draft; extra content uses the same slot.</p></template>
    </mp-time-range-picker>
    <span>Valid confirmations: {{ confirmations }}</span>
    <span>Committed value: {{ value }}</span>
    <p>With confirmation enabled, selection only changes the draft. The value above changes after confirmation.</p>
  </div>
</template>
