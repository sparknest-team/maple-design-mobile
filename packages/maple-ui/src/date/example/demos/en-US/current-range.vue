<script setup lang="ts">
import { ref } from 'vue'

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const selected = ref(yesterday)
const showCurrent = ref(true)
const showNowButton = ref(true)
const range = ref(['2025-01-05 09:00', '2025-01-10 18:00'])
</script>
<template>
  <div>
    <p>Current highlighting and selecting now are independent.</p>
    <mp-checkbox v-model="showCurrent">Highlight current</mp-checkbox>
    <mp-checkbox v-model="showNowButton">Select now button</mp-checkbox>
    <mp-date-picker
      v-model="selected"
      value-format="Date"
      :default-picker-value="new Date()"
      :show-current="showCurrent"
      :show-now-button="showNowButton"
      :disable-confirm="false"
      presentation="calendar"
    />
    <p>Confirmed selection: {{ selected }}</p>
    <p>Switch summary tabs to edit either endpoint. Reversed ranges show an error and disable confirmation.</p>
    <mp-date-range-picker
      v-model="range"
      show-time
      :use-seconds="false"
      :disable-confirm="false"
      presentation="calendarPicker"
    />
    <p>Confirmed range: {{ range }}</p>
  </div>
</template>
