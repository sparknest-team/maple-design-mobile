<script setup>
import { ref } from 'vue'

const generation = ref(0)
const closeCount = ref(0)
const closedCount = ref(0)
</script>

<template>
  <section class="alert-close-demo">
    <mp-alert
      :key="generation"
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      closable
      @close="closeCount++"
      @closed="closedCount++"
    />
    <p role="status">Close: {{ closeCount }} · Closed: {{ closedCount }}</p>
    <mp-button :disabled="closedCount === generation" @click="generation++">Reopen / 重新打开</mp-button>
  </section>
</template>
