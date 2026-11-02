<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import AnimationDemo from './demos/animation.vue'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="statistic">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

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

  <section data-demo="countdown">
    <app-type>{{ english ? 'Countdown' : '倒计时' }}</app-type>
    <CountdownDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="prefix-suffix">
    <app-type>{{ english ? 'Prefix / Suffix' : '前缀 / 后缀' }}</app-type>
    <PrefixSuffixDemo />
  </section>

  <section data-demo="custom-value">
    <app-type>{{ english ? 'Custom Value' : '自定义数值' }}</app-type>
    <CustomValueDemo />
  </section>
</template>
