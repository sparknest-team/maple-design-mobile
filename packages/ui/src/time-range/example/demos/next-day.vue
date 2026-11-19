<script setup lang="ts">
import { ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const range = ref<string[] | undefined>(['22:00', '06:00'])
const reset = () => {
  range.value = ['22:00', '06:00']
}
</script>

<template>
  <section class="time-overnight-demo">
    <mp-time-range v-model="range" format="HH:mm" input-editable show-next-day clearable />
    <output aria-label="Overnight model">{{ range === undefined ? 'undefined' : JSON.stringify(range) }}</output>
    <mp-button @click="reset">{{ english ? 'Reset' : '重置' }}</mp-button>
  </section>
</template>

<style scoped>
.time-overnight-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 360px;
}
</style>
