<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
const events = ref<string[]>([])
function record(name: string) {
  events.value = [...events.value.slice(-7), name]
}
</script>

<template>
  <p>Use Tab to focus, then Space or Enter to toggle.</p>
  <mp-switch
    v-model="value"
    size="md"
    aria-label="Event sequence"
    @focus="record('focus')"
    @blur="record('blur')"
    @click="record('click')"
    @update:model-value="record(`update: ${$event}`)"
    @change="record(`change: ${$event}`)"
  />
  <p aria-live="polite">{{ events.join(' → ') || 'No events yet' }}</p>
  <mp-button @click="events = []">Clear events</mp-button>
</template>
