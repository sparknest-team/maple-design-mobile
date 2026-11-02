<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ text: 'Hello' as string | null })
</script>
<template>
  <mp-space direction="column">
    <p>The clear icon produces null; Backspace to empty produces an empty string.</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="text" label="Keyword">
        <mp-input v-model="model.text" edit-mode="direct" clearable :empty-value="null" />
      </mp-form-item>
    </mp-form>
    <mp-button @click="model.text = 'Hello'">Restore initial value</mp-button>
    <p>
      Current model: <output>{{ JSON.stringify(model.text) }}</output>
    </p>
  </mp-space>
</template>
