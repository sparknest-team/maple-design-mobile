<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import ControlledRangeDemo from './demos/controlled-range.vue'
import CustomStyleDemo from './demos/custom-style.vue'
import DualThumbDemo from './demos/dual-thumb.vue'
import InteractionSessionDemo from './demos/interaction-session.vue'
import KeyboardInputDemo from './demos/keyboard-input.vue'
import RangeDemo from './demos/range.vue'
import SliderSizeDemo from './demos/slider-size.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import StepSizeDemo from './demos/step-size.vue'
import ContentThumbLabelComparison from './demos/thumb-label-comparison.vue'
import TouchAndLabelsDemo from './demos/touch-and-labels.vue'
import VerticalDemo from './demos/vertical.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="slider">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'basic-usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical' : '垂直' }}</app-type>
    <VerticalDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="touch-and-labels">
    <app-type>{{ english ? 'Tooltips and Custom Handles' : '触控提示与定制' }}</app-type>
    <TouchAndLabelsDemo />
  </section>

  <section data-demo="slider-size">
    <app-type>{{ english ? 'slider-size' : '几何尺寸' }}</app-type>
    <SliderSizeDemo />
  </section>

  <section data-demo="custom-style">
    <app-type>{{ english ? 'custom-style' : '颜色' }}</app-type>
    <CustomStyleDemo />
  </section>

  <section data-demo="thumb-label-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">滑块按钮与数值标签</span><span lang="en-US">Slider thumbs and value labels</span>
    </h3>
    <ContentThumbLabelComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="state-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">交互状态对比</span><span lang="en-US">Interaction state comparison</span>
    </h3>
    <OrganizedStateLab />
  </section>

  <section data-demo="keyboard-input">
    <app-type>{{ english ? 'Ticks, Marks and Numeric Input' : '刻度、标记和数字输入' }}</app-type>
    <KeyboardInputDemo />
  </section>

  <section data-demo="step-size">
    <app-type>{{ english ? 'step-size' : '步长' }}</app-type>
    <StepSizeDemo />
  </section>

  <section data-demo="controlled-range">
    <app-type>{{ english ? 'Controlled and Non-crossing Range' : '受控与非交叉范围' }}</app-type>
    <ControlledRangeDemo />
  </section>

  <section data-demo="dual-thumb">
    <app-type>{{ english ? 'dual-thumb' : '范围' }}</app-type>
    <DualThumbDemo />
  </section>

  <section data-demo="range">
    <app-type>{{ english ? 'range' : '自定义边界' }}</app-type>
    <RangeDemo />
  </section>

  <section data-demo="interaction-session">
    <app-type>{{ english ? 'Canceled pointer interactions' : '指针交互取消收尾' }}</app-type>
    <InteractionSessionDemo />
  </section>
</template>
