<script setup lang="ts">
import { ref } from 'vue'

const value = ref('2025-01-15')
const range = ref(['2025-01-15', '2025-01-20'])
const panelOnly = ref(false)
</script>

<template>
  <p>输入 DD/MM/YYYY，Enter 或失焦提交；非法日期和范围外输入恢复模型显示。</p>
  <mp-date v-model="value" format="DD/MM/YYYY" min="2025-01-10" max="2025-01-25" :input-editable="!panelOnly" />
  <p>模型：{{ value }}</p>
  <mp-switch v-model="panelOnly" />
  <p>仅面板选择：{{ panelOnly }}</p>
  <mp-date-range v-model="range" format="DD/MM/YYYY" :disabled="[true, false]" :input-editable="!panelOnly" />
  <p>起点锁定，终点不能早于起点：{{ range }}</p>
</template>
