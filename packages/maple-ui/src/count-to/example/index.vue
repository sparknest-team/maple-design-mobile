<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomStyleDemo from './demos/custom-style.vue'
import ManualControlDemo from './demos/manual-control.vue'
import ContentNumberFormatComparison from './demos/number-format-comparison.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="count-to">
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

  <section data-demo="number-format-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">精度、时长与动画曲线</span><span lang="en-US">Precision, duration and easing</span>
    </h3>
    <ContentNumberFormatComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom-style">
    <app-type>{{ english ? 'Custom Styles' : '自定义样式' }}</app-type>
    <CustomStyleDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="manual-control">
    <app-type>{{ english ? 'Manual Control' : '手动控制' }}</app-type>
    <ManualControlDemo />
  </section>
</template>
