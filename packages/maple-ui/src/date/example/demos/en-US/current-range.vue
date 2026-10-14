<script setup lang="ts">
import { ref } from 'vue'

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const selected = ref(yesterday)
const showCurrent = ref(true)
const showNowButton = ref(true)
const exchangeTime = ref(true)
const range = ref(['2025-01-05 09:00', '2025-01-10 18:00'])
</script>
<template>
  <div>
    <p>Current highlighting and selecting now are independent.</p>
    <label><input v-model="showCurrent" type="checkbox" /> Highlight current</label>
    <label><input v-model="showNowButton" type="checkbox" /> Select now button</label>
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
    <label><input v-model="exchangeTime" type="checkbox" /> Exchange time with reversed dates</label>
    <p>Choose a later date, then an earlier date, and compare endpoint times.</p>
    <mp-date-range-picker
      v-model="range"
      show-time
      :use-seconds="false"
      :exchange-time="exchangeTime"
      :disable-confirm="false"
      presentation="calendarClock"
    />
    <p>Confirmed range: {{ range }}</p>
  </div>
</template>
