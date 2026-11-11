<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const values = [1111, 8888, 1010, 9090]
const count = ref(values[0])
const index = ref(0)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    index.value = (index.value + 1) % values.length
    count.value = values[index.value]
  }, 800)
})

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <p class="statistic-example__hint">数值始终保持四位，请观察右侧竖线的位置。</p>
  <mp-space direction="column" size="lg">
    <mp-statistic
      title="比例数字（右侧标记会跳动）"
      :value="count"
      suffix="|"
      :value-style="{ fontVariantNumeric: 'proportional-nums' }"
    />
    <mp-statistic title="等宽数字（右侧标记保持稳定）" :value="count" suffix="|" tabular-nums />
  </mp-space>
</template>

<style scoped>
.statistic-example__hint {
  margin: 0 0 12px;
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
  line-height: 1.5;
}
</style>
