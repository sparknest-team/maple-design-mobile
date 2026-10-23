<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AnimationDemo from './demos/animation.vue'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CountdownDemo from './demos/countdown.vue'
import CustomValueDemo from './demos/custom-value.vue'
import ExtraDemo from './demos/extra.vue'
import PrefixSuffixDemo from './demos/prefix-suffix.vue'
import TabularNumsDemo from './demos/tabular-nums.vue'

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

  <section data-demo="prefix-suffix">
    <app-type>{{ english ? 'Prefix / Suffix' : '前缀 / 后缀' }}</app-type>
    <PrefixSuffixDemo />
  </section>

  <section data-demo="tabular-nums">
    <app-type>{{ english ? 'Tabular Numbers' : '等宽数字' }}</app-type>
    <TabularNumsDemo />
  </section>

  <section data-demo="extra">
    <app-type>{{ english ? 'Extra' : '额外信息' }}</app-type>
    <ExtraDemo />
  </section>

  <section data-demo="animation">
    <app-type>{{ english ? 'Animation' : '数值动画' }}</app-type>
    <AnimationDemo />
  </section>

  <section data-demo="custom-value">
    <app-type>{{ english ? 'Custom Value' : '自定义数值' }}</app-type>
    <CustomValueDemo />
  </section>

  <section data-demo="countdown">
    <app-type>{{ english ? 'Countdown' : '倒计时' }}</app-type>
    <CountdownDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
