<template>
  <mp-notice-bar scrollable :paused="paused" text="这是一条较长的通知，您可以暂停滚动后继续阅读。">
    <template #action>
      <button type="button" :aria-pressed="paused" @click="paused = !paused">
        {{ paused ? '继续滚动' : '暂停滚动' }}
      </button>
    </template>
  </mp-notice-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paused = ref(false)
</script>
