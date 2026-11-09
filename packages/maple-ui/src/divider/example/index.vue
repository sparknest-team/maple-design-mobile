<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import ContentFlowDemo from './demos/content-flow.vue'
import CustomDemo from './demos/custom.vue'
import ContentLineAppearanceComparison from './demos/line-appearance-comparison.vue'
import LivePropertiesDemo from './demos/live-properties.vue'
import VerticalDemo from './demos/vertical.vue'
import WithDescDemo from './demos/with-desc.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="divider">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical Divider' : '垂直分割线' }}</app-type>
    <VerticalDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="with-desc">
    <app-type>{{ english ? 'With Text' : '带文字' }}</app-type>
    <WithDescDemo />
  </section>

  <section data-demo="line-appearance-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">线条尺寸、样式与颜色</span><span lang="en-US">Line size, style and color</span>
    </h3>
    <ContentLineAppearanceComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom">
    <app-type>{{ english ? 'Custom Content' : '自定义内容' }}</app-type>
    <CustomDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="live-properties">
    <app-type>{{ english ? 'Live Properties' : '动态属性' }}</app-type>
    <LivePropertiesDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-layout">
    <span lang="zh-CN">内容与布局</span>
    <span lang="en-US">Content and layout</span>
  </h2>

  <section data-demo="content-flow">
    <app-type>{{ english ? 'Content height and minimum thickness' : '内容占位与最小线宽' }}</app-type>
    <ContentFlowDemo />
  </section>
</template>
