<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const statuses = ['wait', 'process', 'finish', 'error'] as const
type StepStatus = (typeof statuses)[number]
const verticalStatus = ref<StepStatus>('process')
function next() {
  current.value = current.value >= 4 ? 1 : current.value + 1
}
</script>

<template>
  <mp-radio-group v-model="verticalStatus" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps orientation="vertical" :current="current" :status="verticalStatus">
    <mp-step>步骤1</mp-step>
    <mp-step>步骤2</mp-step>
    <mp-step>步骤3</mp-step>
    <mp-step>步骤4</mp-step>
  </mp-steps>

  <mp-button status="primary" block @click="next">下一步</mp-button>
</template>

<style lang="less" scoped>
.status-switch {
  margin-bottom: 16px;
}
</style>
