<template>
  <mp-space direction="column">
    <mp-count-to ref="counter" :from="0" :to="100" :duration="duration" @end="ends++" />
    <mp-space>
      <mp-button @click="duration = duration === 0 ? 600 : 0">切换时长 / Toggle duration</mp-button>
      <mp-button @click="counter?.reset()">重新播放 / Replay</mp-button>
    </mp-space>
    <p role="status">Duration: {{ duration }}ms; end: {{ ends }}. 0 时长在下一帧完成，不占用持续动画帧。</p>
  </mp-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { CountToInstance } from '@maple-design/ui'

const counter = ref<CountToInstance>()
const duration = ref(0)
const ends = ref(0)
</script>
