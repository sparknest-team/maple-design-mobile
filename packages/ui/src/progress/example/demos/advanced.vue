<script setup>
import { ref } from 'vue'

const gradient = ref(false)
</script>
<template>
  <mp-space direction="column" size="16px">
    <mp-switch v-model="gradient" aria-label="Gradient" />
    <mp-progress
      :percent="65"
      :color="gradient ? { '0%': '#722ed1', '100%': '#0fc6c2' } : '#722ed1'"
      buffer-color="#eee5ff"
    />
    <mp-space wrap size="24px">
      <mp-progress
        mode="circle"
        :percent="65"
        :rotate="90"
        :color="gradient ? { '0%': '#722ed1', '100%': '#0fc6c2' } : '#722ed1'"
      />
      <mp-progress mode="circle" :percent="65" :track="false"
        ><template #text="{ percent }">{{ percent }} / 100</template></mp-progress
      >
    </mp-space>
  </mp-space>
</template>
