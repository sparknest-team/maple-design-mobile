<script setup>
import { ref } from 'vue'

const lastEvent = ref('—')
const readonly = ref(false)
const start = ref('09:00:00')
const end = ref('18:00:00')
const range = ref(['09:00:00', '18:00:00'])
</script>
<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <label><input v-model="readonly" type="checkbox" /> Readonly fields remain focusable</label>
    <input placeholder="Press Enter here: time popups should not open" />
    <small aria-live="polite">{{ lastEvent }}</small>
    <div aria-live="polite">
      <div>Start model: {{ start ?? 'undefined' }}</div>
      <div>End model: {{ end ?? 'undefined' }}</div>
      <div>Range model: {{ range ?? 'undefined' }}</div>
    </div>
    <p>Open and cancel each field in sequence. Drafts remain independent.</p>
    <mp-time
      v-model="start"
      :readonly="readonly"
      format="HH:mm:ss"
      placeholder="Start"
      style="width: 100%; max-width: 360px"
      @focus="lastEvent = 'start: focus'"
      @blur="lastEvent = 'start: blur'"
    />
    <mp-time
      v-model="end"
      :readonly="readonly"
      format="HH:mm:ss"
      placeholder="End"
      style="width: 100%; max-width: 360px"
      @focus="lastEvent = 'end: focus'"
      @blur="lastEvent = 'end: blur'"
    />
    <mp-time-range
      v-model="range"
      :readonly="readonly"
      format="HH:mm:ss"
      style="width: 100%; max-width: 360px"
      @focus="lastEvent = 'range: focus'"
      @blur="lastEvent = 'range: blur'"
    />
  </mp-space>
</template>
