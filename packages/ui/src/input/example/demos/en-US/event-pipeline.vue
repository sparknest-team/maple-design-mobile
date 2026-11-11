<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Editable content')
const events = ref<string[]>([])
const record = (name: string) => {
  events.value = [...events.value.slice(-7), name]
}
</script>
<template>
  <div class="input-pipeline-demo">
    <mp-input
      v-model="value"
      clearable
      placeholder="Type and clear"
      @clear="record('clear')"
      @input="record('input')"
      @update:model-value="record('update:modelValue')"
      @change="record('change')"
    />
    <p>Typing: input → update; clearing: clear → input → update → change.</p>
    <output>{{ events.join(' → ') || 'Waiting for interaction' }}</output>
  </div>
</template>
<style scoped>
.input-pipeline-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.input-pipeline-demo p {
  margin: 0;
}
</style>
