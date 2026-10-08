<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete
      v-model="looseValue"
      :options="options"
      placeholder="Default: type ar"
      style="width: 100%; max-width: 320px"
    />
    <mp-auto-complete
      v-model="strictValue"
      :options="options"
      strict
      placeholder="Strict: type Ar"
      style="width: 100%; max-width: 320px"
    />
  </mp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ['Arco', 'Maple', 'Cedar']
const looseValue = ref('')
const strictValue = ref('')
</script>
