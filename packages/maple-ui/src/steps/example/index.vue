<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ChangeableDemo from './demos/changeable.vue'
import ErrorStatusDemo from './demos/error-status.vue'
import VerticalDemo from './demos/vertical.vue'

const statuses = ['wait', 'process', 'finish', 'error'] as const
type StepStatus = (typeof statuses)[number]
const errorStatus = ref<StepStatus>('error')
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="error-status">
    <app-type>{{ english ? 'Error Status' : '错误状态' }}</app-type>
    <ErrorStatusDemo />
  </section>

  <section data-demo="changeable">
    <app-type>{{ english ? 'Changeable' : '可切换' }}</app-type>
    <ChangeableDemo />
  </section>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical Mode' : '垂直模式' }}</app-type>
    <VerticalDemo />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
