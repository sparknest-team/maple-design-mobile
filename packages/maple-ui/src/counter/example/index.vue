<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import DisabledDemo from './demos/disabled.vue'
import LazyChangeDemo from './demos/lazy-change.vue'
import RangeDemo from './demos/range.vue'
import ReadonlyDemo from './demos/readonly.vue'
import SizeDemo from './demos/size.vue'
import StepDemo from './demos/step.vue'
import ToFixedDemo from './demos/to-fixed.vue'

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

  <section data-demo="size">
    <app-type>{{ english ? 'Set Size' : '设置尺寸' }}</app-type>
    <SizeDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="readonly">
    <app-type>{{ english ? 'Readonly' : '只读' }}</app-type>
    <ReadonlyDemo />
  </section>

  <section data-demo="range">
    <app-type>{{ english ? 'Set Value Range' : '设置取值范围' }}</app-type>
    <RangeDemo />
  </section>

  <section data-demo="step">
    <app-type>{{ english ? 'Set Step' : '设置步长' }}</app-type>
    <StepDemo />
  </section>

  <section data-demo="to-fixed">
    <app-type>{{ english ? 'Decimal Length' : '保留小数' }}</app-type>
    <ToFixedDemo />
  </section>

  <section data-demo="lazy-change">
    <app-type>{{ english ? 'Asynchronous Change' : '异步变更' }}</app-type>
    <LazyChangeDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
