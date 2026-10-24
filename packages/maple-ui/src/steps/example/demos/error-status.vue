<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const statuses = ['wait', 'process', 'finish', 'error'] as const
type StepStatus = (typeof statuses)[number]
const errorStatus = ref<StepStatus>('error')
</script>

<template>
  <mp-radio-group v-model="errorStatus" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps :model-value="2" :status="errorStatus" content-placement="bottom">
    <mp-step>步骤1</mp-step>
    <mp-step>步骤2</mp-step>
    <mp-step>步骤3</mp-step>
  </mp-steps>
</template>

<style lang="less" scoped>
.status-switch {
  margin-bottom: 16px;
}
</style>
