<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const statuses = ['wait', 'process', 'finish', 'error'] as const
type StepStatus = (typeof statuses)[number]
const changeableStatus = ref<StepStatus>('process')
</script>

<template>
  <mp-radio-group v-model="changeableStatus" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps v-model:current="current" :status="changeableStatus" content-placement="bottom" changeable>
    <mp-step description="这是描述信息">步骤1</mp-step>
    <mp-step description="这是描述信息">步骤2</mp-step>
    <mp-step description="这是描述信息">步骤3</mp-step>
    <mp-step description="这是描述信息">步骤4</mp-step>
  </mp-steps>
</template>

<style lang="less" scoped>
.status-switch {
  margin-bottom: 16px;
}
</style>
