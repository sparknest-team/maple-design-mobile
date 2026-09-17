<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <mp-alert
    v-if="show"
    title="傲慢与偏见"
    message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
    closable
    @close="show = false"
  />
</template>
