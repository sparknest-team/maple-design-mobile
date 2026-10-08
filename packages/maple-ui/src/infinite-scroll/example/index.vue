<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicDemo from './demos/basic.vue'
import CustomStatusDemo from './demos/custom-status.vue'
import ErrorDemo from './demos/error.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <BasicDemo />
  </section>
  <section data-demo="error">
    <app-type>{{ english ? 'Retry on Error' : '失败重试' }}</app-type>
    <ErrorDemo />
  </section>
  <section data-demo="custom-status">
    <app-type>{{ english ? 'Custom Status' : '自定义状态' }}</app-type>
    <CustomStatusDemo />
  </section>
</template>
