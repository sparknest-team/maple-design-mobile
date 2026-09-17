<script setup>
import { ref } from 'vue'

const showCloseIcon = ref(true)
</script>

<template>
  <mp-alert
    v-if="showCloseIcon"
    title="傲慢与偏见"
    message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
    closable
    @close="showCloseIcon = false"
  >
    <template #close-icon>
      <m-icon-close />
    </template>
  </mp-alert>
</template>
