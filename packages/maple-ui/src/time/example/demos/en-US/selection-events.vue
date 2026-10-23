<script setup>
import { ref } from 'vue'

const value = ref('09:00')
const immediate = ref(false)
const readonly = ref(false)
const disabled = ref(false)
const events = ref([])
function record(name, value, dates) {
  const times = Array.isArray(dates) ? dates.map((date) => date?.toLocaleTimeString()) : dates?.toLocaleTimeString()
  events.value = [JSON.stringify({ event: name, value: value ?? null, time: times ?? null }), ...events.value].slice(
    0,
    5,
  )
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <mp-checkbox v-model="readonly">Read-only: focus allowed, edits blocked</mp-checkbox>
    <mp-checkbox v-model="disabled">Disabled: focus released, edits blocked</mp-checkbox>
    <mp-checkbox v-model="immediate">Commit immediately on selection</mp-checkbox>
    <p>Select records drafts. Change records commits. Cancel leaves the model unchanged. Clear returns undefined.</p>
    <mp-time
      v-model="value"
      :disable-confirm="immediate"
      :readonly="readonly"
      :disabled="disabled"
      format="HH:mm"
      clearable
      @select="(value, dates) => record('select', value, dates)"
      @change="(value, dates) => record('change', value, dates)"
      @clear="record('clear')"
      @click="record('click')"
      @open-change="(open) => record('open-change', open)"
      @focus="record('focus')"
      @blur="record('blur')"
    />
    <span>Model: {{ value === undefined ? 'undefined' : value }}</span>
    <mp-button variant="outline" @click="value = '15:30'">Replace model externally</mp-button>
    <small>External replacement updates the display without emitting select or change.</small>
    <div v-for="(event, index) in events" :key="index" style="overflow-wrap: anywhere">{{ event }}</div>
  </div>
</template>
