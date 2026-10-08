<template>
  <label :for="inputId">Frontend framework</label>
  <mp-auto-complete
    v-model="value"
    :options="options"
    :input-attrs="{ id: inputId, 'aria-describedby': helpId }"
    style="width: 100%; max-width: 320px"
  />
  <p :id="helpId">Use arrow keys to navigate, Enter to select, Escape to close.</p>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'

const inputId = useId()
const helpId = useId()
const value = ref('')
const options = ['Vue', 'React', 'Angular']
</script>
