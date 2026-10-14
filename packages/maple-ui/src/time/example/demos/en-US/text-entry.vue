<script setup>
import { ref } from 'vue'

const value = ref('09:00')
const editable = ref(true)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <label><input v-model="editable" type="checkbox" /> Allow text entry</label>
    <p>
      Enter or blur to commit; Escape to cancel. Allowed range: 08:00–18:00. Use the clock button or ArrowDown to open
      the panel.
    </p>
    <mp-time v-model="value" :input-editable="editable" format="HH:mm" min="08:00" max="18:00" clearable />
    <span>{{ value }}</span>
  </mp-space>
</template>
