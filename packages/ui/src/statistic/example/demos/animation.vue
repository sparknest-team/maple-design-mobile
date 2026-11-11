<script setup>
import { ref } from 'vue'

const started = ref(false)
const enabled = ref(false)
const origin = ref(0)
const duration = ref(800)
</script>

<template>
  <mp-space align="flex-end" size="lg">
    <mp-statistic title="增长率" :value="50.52" :precision="2" :value-from="0" :start="started" suffix="%" animation>
      <template #prefix>▲</template>
    </mp-statistic>
    <mp-button status="primary" @click="started = true">开始</mp-button>
  </mp-space>

  <mp-space direction="column" style="margin-top: 16px">
    <h4>动态开关与配置 / Dynamic animation</h4>
    <mp-statistic
      title="动态目标 / Dynamic target"
      :value="100"
      :animation="enabled"
      :value-from="origin"
      :animation-duration="duration"
    />
    <mp-space wrap>
      <mp-button @click="enabled = !enabled">{{
        enabled ? '关闭动画 / Disable animation' : '启用动画 / Enable animation'
      }}</mp-button>
      <mp-button @click="origin = origin === 0 ? 20 : 0">切换起点 / Change origin</mp-button>
      <mp-button @click="duration = duration === 800 ? 1600 : 800">切换时长 / Change duration</mp-button>
    </mp-space>
    <p>起点 / From: {{ origin }}；时长 / Duration: {{ duration }}ms</p>
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
