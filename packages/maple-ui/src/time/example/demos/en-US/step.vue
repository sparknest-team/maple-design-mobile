<script setup>
import { computed, ref } from 'vue'

const value = ref('09:30:00')
const coarse = ref(false)
const step = computed(() => ({ hour: 1, minute: coarse.value ? 30 : 15, second: 10 }))
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <label><input v-model="coarse" type="checkbox" /> Use 30-minute intervals</label>
    <p>Confirmation validates the current step. Changing a rule does not change the committed value.</p>
    <mp-time v-model="value" format="HH:mm:ss" :step="step" style="width: 100%; max-width: 360px" />
    <span>{{ value }}</span>
  </mp-space>
</template>
