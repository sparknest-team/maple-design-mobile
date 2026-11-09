<template>
  <mp-notice-bar scrollable :paused="paused" text="This notice can be paused so you can continue reading.">
    <template #action>
      <button type="button" :aria-pressed="paused" @click="paused = !paused">
        {{ paused ? 'Resume scrolling' : 'Pause scrolling' }}
      </button>
    </template>
  </mp-notice-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paused = ref(false)
</script>
