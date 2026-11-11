<script setup>
import { ref } from 'vue'

const lastEvent = ref('—')
const readonly = ref(false)
const start = ref('09:00:00')
const end = ref('18:00:00')
const range = ref(['09:00:00', '18:00:00'])
</script>
<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="readonly">只读字段仍可聚焦，但不能展开修改</mp-checkbox>
    <mp-input placeholder="在这里按 Enter，不会打开时间面板" />
    <small aria-live="polite">{{ lastEvent }}</small>
    <div aria-live="polite">
      <div>开始模型: {{ start ?? 'undefined' }}</div>
      <div>结束模型: {{ end ?? 'undefined' }}</div>
      <div>范围模型: {{ range ?? 'undefined' }}</div>
    </div>
    <p>依次打开、取消各个字段，检查每个字段的草稿互不影响。</p>
    <mp-time
      v-model="start"
      :readonly="readonly"
      format="HH:mm:ss"
      placeholder="开始时间"
      style="width: 100%; max-width: 360px"
      @focus="lastEvent = 'start: focus'"
      @blur="lastEvent = 'start: blur'"
    />
    <mp-time
      v-model="end"
      :readonly="readonly"
      format="HH:mm:ss"
      placeholder="结束时间"
      style="width: 100%; max-width: 360px"
      @focus="lastEvent = 'end: focus'"
      @blur="lastEvent = 'end: blur'"
    />
    <mp-time-range
      v-model="range"
      :readonly="readonly"
      format="HH:mm:ss"
      style="width: 100%; max-width: 360px"
      @focus="lastEvent = 'range: focus'"
      @blur="lastEvent = 'range: blur'"
    />
  </mp-space>
</template>
