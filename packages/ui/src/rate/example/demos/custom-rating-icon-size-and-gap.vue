<script setup>
import { reactive } from 'vue'

const scores = reactive({
  score: 3,
  score1: 3,
  score3: 3,
  score4: 3,
  score6: 3.5,
  score7: 3,
  score8: 3,
  score10: 3,
  score12: 3.5,
})
</script>

<template>
  <mp-rate v-model="scores.score4" size="8vmin" gap="1vmin" />
</template>
