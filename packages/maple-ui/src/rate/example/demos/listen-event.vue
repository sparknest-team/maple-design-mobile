<script setup>
import { reactive } from 'vue'
import { Message } from '@maplejs/maple-ui'

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
function handleChange(score) {
  Message({
    content: `click ${score}`,
    position: 'top',
  })
}
</script>

<template>
  <mp-rate v-model="scores.score10" @change="handleChange" />
</template>
