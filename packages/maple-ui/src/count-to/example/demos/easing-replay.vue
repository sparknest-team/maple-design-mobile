<template>
  <mp-space direction="column">
    <mp-count-to ref="counter" :to="100" :duration="1200" :timing-function="curve" />
    <mp-space>
      <mp-button @click="cubic = !cubic">切换曲线 / Change curve</mp-button>
      <mp-button @click="replay">重新播放 / Replay</mp-button>
    </mp-space>
    <p role="status">Next: {{ cubic ? 'ease-out cubic' : 'linear' }}; current: {{ applied }}.</p>
    <p>切换曲线在下次播放生效；点击重新播放查看效果。Changing the curve applies on replay.</p>
  </mp-space>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CountToInstance } from '@maple-design/ui'

const counter = ref<CountToInstance>()
const cubic = ref(false)
const applied = ref('linear')
const linear = (value: number) => value
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)
const curve = computed(() => (cubic.value ? easeOutCubic : linear))
function replay() {
  applied.value = cubic.value ? 'ease-out cubic' : 'linear'
  counter.value?.reset()
}
</script>
