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
  <mp-rate v-model="scores.score6" :count="8" allow-half />
  <mp-rate
    v-model="scores.score6"
    :count="8"
    icon="heart-fill"
    half-icon="heart-half-full"
    empty-icon="heart"
    color="var(--mp-color-danger)"
    allow-half
    style="margin-top: 4px"
  />
</template>
