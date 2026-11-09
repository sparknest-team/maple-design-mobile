<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Editable')
const submissions = ref(0)
const event = ref('Use Tab or Enter')
</script>
<template>
  <mp-form style="display: flex; flex-wrap: wrap; gap: 12px" @submit="submissions++" @reset="value = 'Editable'">
    <mp-input
      v-model="value"
      aria-label="Example field"
      placeholder="Example field"
      style="width: 100%; max-width: 280px"
    />
    <mp-button html-type="submit">Submit</mp-button>
    <mp-button html-type="reset">Reset</mp-button>
    <mp-button :focusable="false">Skip Tab</mp-button>
    <mp-button @focus="event = 'focus'" @blur="event = 'blur'" @click="event = 'click'">Event target</mp-button>
  </mp-form>
  <p aria-live="polite">Submissions: {{ submissions }}; {{ event }}</p>
</template>
