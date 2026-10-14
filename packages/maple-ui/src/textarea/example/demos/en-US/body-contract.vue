<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Editable content')
const events = ref<string[]>([])
const record = (name: string) => {
  events.value = [...events.value.slice(-7), name]
}
</script>
<template>
  <div class="textarea-body-demo">
    <mp-textarea
      v-model="value"
      hint
      clearable
      placeholder="Work notes"
      :auto-size="{ minRows: 2, maxRows: 5 }"
      :max-length="100"
      show-word-limit
      @clear="record('clear')"
      @input="record('input')"
      @update:model-value="record('update:modelValue')"
      @change="record('change')"
    />
    <mp-textarea :line="false" hint placeholder="Borderless hint" focus-color="#137547" :rows="2" />
    <p>Enter inserts a newline; blur commits; clearing notifies each semantic once.</p>
    <output>{{ events.join(' → ') || 'Waiting for interaction' }}</output>
  </div>
</template>
<style scoped>
.textarea-body-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.textarea-body-demo p {
  margin: 0;
}
</style>
