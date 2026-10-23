<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ControlledRangeDemo from './demos/controlled-range.vue'
import CustomBtnDemo from './demos/custom-btn.vue'
import CustomStyleDemo from './demos/custom-style.vue'
import DisableDemo from './demos/disable.vue'
import DualThumbDemo from './demos/dual-thumb.vue'
import KeyboardInputDemo from './demos/keyboard-input.vue'
import RangeDemo from './demos/range.vue'
import ReadonlyDemo from './demos/readonly.vue'
import ShowLabelDemo from './demos/show-label.vue'
import SliderSizeDemo from './demos/slider-size.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import StepSizeDemo from './demos/step-size.vue'
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
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'basic-usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="readonly">
    <app-type>{{ english ? 'readonly' : '只读' }}</app-type>
    <ReadonlyDemo />
  </section>

  <section data-demo="step-size">
    <app-type>{{ english ? 'step-size' : '步长' }}</app-type>
    <StepSizeDemo />
  </section>

  <section data-demo="dual-thumb">
    <app-type>{{ english ? 'dual-thumb' : '范围' }}</app-type>
    <DualThumbDemo />
  </section>

  <section data-demo="range">
    <app-type>{{ english ? 'range' : '自定义边界' }}</app-type>
    <RangeDemo />
  </section>

  <section data-demo="disable">
    <app-type>{{ english ? 'disable' : '禁用' }}</app-type>
    <DisableDemo />
  </section>

  <section data-demo="slider-size">
    <app-type>{{ english ? 'slider-size' : '几何尺寸' }}</app-type>
    <SliderSizeDemo />
  </section>

  <section data-demo="custom-style">
    <app-type>{{ english ? 'custom-style' : '颜色' }}</app-type>
    <CustomStyleDemo />
  </section>

  <section data-demo="custom-btn">
    <app-type>{{ english ? 'custom-btn' : '自定义拇指' }}</app-type>
    <CustomBtnDemo />
  </section>

  <section data-demo="show-label">
    <app-type>{{ english ? 'show-label' : '提示' }}</app-type>
    <ShowLabelDemo />
  </section>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical' : '垂直' }}</app-type>
    <VerticalDemo />
  </section>
  <section data-demo="keyboard-input">
    <app-type>{{ english ? 'Ticks, Marks and Numeric Input' : '刻度、标记和数字输入' }}</app-type>
    <KeyboardInputDemo />
  </section>
  <section data-demo="touch-and-labels">
    <app-type>{{ english ? 'Tooltips and Custom Handles' : '触控提示与定制' }}</app-type>
    <TouchAndLabelsDemo />
  </section>
  <section data-demo="controlled-range">
    <app-type>{{ english ? 'Controlled and Non-crossing Range' : '受控与非交叉范围' }}</app-type>
    <ControlledRangeDemo />
  </section>
  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
