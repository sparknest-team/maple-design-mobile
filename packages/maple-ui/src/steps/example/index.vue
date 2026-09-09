<script setup lang="ts">
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const current = ref(1)
const statuses = ['wait', 'process', 'finish', 'error'] as const
type StepStatus = (typeof statuses)[number]
const basicStatus = ref<StepStatus>('process')
const errorStatus = ref<StepStatus>('error')
const changeableStatus = ref<StepStatus>('process')
const verticalStatus = ref<StepStatus>('process')

watchLang(use)
onThemeChange()

function next() {
  current.value = current.value >= 4 ? 1 : current.value + 1
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-radio-group v-model="basicStatus" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps :current="current" :status="basicStatus" content-placement="bottom">
    <mp-step>{{ t('first') }}</mp-step>
    <mp-step>{{ t('second') }}</mp-step>
    <mp-step>{{ t('third') }}</mp-step>
    <mp-step>{{ t('fourth') }}</mp-step>
  </mp-steps>

  <app-type>{{ t('errorStatus') }}</app-type>
  <mp-radio-group v-model="errorStatus" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps :current="2" :status="errorStatus" content-placement="bottom">
    <mp-step>{{ t('first') }}</mp-step>
    <mp-step>{{ t('second') }}</mp-step>
    <mp-step>{{ t('third') }}</mp-step>
  </mp-steps>

  <app-type>{{ t('changeable') }}</app-type>
  <mp-radio-group v-model="changeableStatus" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps v-model:current="current" :status="changeableStatus" content-placement="bottom" changeable>
    <mp-step :description="t('description')">{{ t('first') }}</mp-step>
    <mp-step :description="t('description')">{{ t('second') }}</mp-step>
    <mp-step :description="t('description')">{{ t('third') }}</mp-step>
    <mp-step :description="t('description')">{{ t('fourth') }}</mp-step>
  </mp-steps>

  <app-type>{{ t('vertical') }}</app-type>
  <mp-radio-group v-model="verticalStatus" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps orientation="vertical" :current="current" :status="verticalStatus">
    <mp-step>{{ t('first') }}</mp-step>
    <mp-step>{{ t('second') }}</mp-step>
    <mp-step>{{ t('third') }}</mp-step>
    <mp-step>{{ t('fourth') }}</mp-step>
  </mp-steps>

  <mp-button status="primary" block @click="next">{{ t('next') }}</mp-button>
</template>

<style scoped lang="less">
.status-switch {
  margin-bottom: 16px;
}
</style>
