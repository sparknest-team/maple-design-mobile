<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ContentAppearanceComparison from './demos/appearance-comparison.vue'
import BasicDemo from './demos/basic.vue'
import CircleDemo from './demos/circle.vue'
import CustomDemo from './demos/custom.vue'
import OrientationDemo from './demos/orientation.vue'
import OverflowKeyboardDemo from './demos/overflow-keyboard.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="progress-group">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <BasicDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">进度组尺寸与颜色</span><span lang="en-US">Progress group sizes and colors</span>
    </h3>
    <ContentAppearanceComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="orientation">
    <app-type>{{ english ? 'Orientation' : '排列方向' }}</app-type>
    <OrientationDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="circle">
    <app-type>{{ english ? 'Circular Segments' : '环形分段进度' }}</app-type>
    <CircleDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="overflow-keyboard">
    <app-type>{{ english ? 'Overflow and keyboard' : '超额数据与键盘提示' }}</app-type
    ><OverflowKeyboardDemo />
  </section>

  <section data-demo="custom">
    <app-type>{{ english ? 'Custom Content' : '自定义内容' }}</app-type>
    <CustomDemo />
  </section>
</template>
