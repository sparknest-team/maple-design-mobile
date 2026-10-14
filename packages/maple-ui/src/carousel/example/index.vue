<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AutoSizedDemo from './demos/auto-sized.vue'
import AutoplayHoverPauseDemo from './demos/autoplay-hover-pause.vue'
import AutoplayDemo from './demos/autoplay.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CenteredSlidesDemo from './demos/centered-slides.vue'
import ControlledDemo from './demos/controlled.vue'
import CustomIndicatorDemo from './demos/custom-indicator.vue'
import EffectCardDemo from './demos/effect-card.vue'
import EffectFadeDemo from './demos/effect-fade.vue'
import EffectSlideDemo from './demos/effect-slide.vue'
import ForbidLoopDemo from './demos/forbid-loop.vue'
import HandleChangeDemo from './demos/handle-change.vue'
import IndicatorPositionDemo from './demos/indicator-position.vue'
import IndicatorTypeDemo from './demos/indicator-type.vue'
import InteractiveContentDemo from './demos/interactive-content.vue'
import KeyboardDemo from './demos/keyboard.vue'
import MousewheelDemo from './demos/mousewheel.vue'
import MultiSlidesDemo from './demos/multi-slides.vue'
import NavigationDemo from './demos/navigation.vue'
import TriggerHoverDemo from './demos/trigger-hover.vue'
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
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="forbid-loop">
    <app-type>{{ english ? 'Forbid Loop' : '禁止循环轮播' }}</app-type>
    <ForbidLoopDemo />
  </section>

  <section data-demo="autoplay">
    <app-type>{{ english ? 'Autoplay' : '开启自动播放' }}</app-type>
    <AutoplayDemo />
  </section>

  <section data-demo="autoplay-hover-pause">
    <app-type>{{ english ? 'Autoplay with Hover to Pause' : '自动播放悬停暂停' }}</app-type>
    <AutoplayHoverPauseDemo />
  </section>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical Carousel' : '垂直轮播' }}</app-type>
    <VerticalDemo />
  </section>

  <section data-demo="navigation">
    <app-type>{{ english ? 'Navigation Arrows' : '切换箭头' }}</app-type>
    <NavigationDemo />
  </section>

  <section data-demo="effect-slide">
    <app-type>{{ english ? 'Slide Effect' : '滑动效果' }}</app-type>
    <EffectSlideDemo />
  </section>

  <section data-demo="effect-fade">
    <app-type>{{ english ? 'Fade Effect' : '淡入淡出效果' }}</app-type>
    <EffectFadeDemo />
  </section>

  <section data-demo="effect-card">
    <app-type>{{ english ? 'Card Effect' : '卡片效果' }}</app-type>
    <EffectCardDemo />
  </section>

  <section data-demo="multi-slides">
    <app-type>{{ english ? 'Multiple Slides Per View' : '多图同屏' }}</app-type>
    <MultiSlidesDemo />
  </section>

  <section data-demo="centered-slides">
    <app-type>{{ english ? 'Centered Slides' : '居中当前滑块' }}</app-type>
    <CenteredSlidesDemo />
  </section>

  <section data-demo="indicator-type">
    <app-type>{{ english ? 'Indicator Types' : '指示器类型' }}</app-type>
    <IndicatorTypeDemo />
  </section>

  <section data-demo="indicator-position">
    <app-type>{{ english ? 'Indicator Position' : '指示器位置' }}</app-type>
    <IndicatorPositionDemo />
  </section>

  <section data-demo="trigger-hover">
    <app-type>{{ english ? 'Trigger with Hover' : '悬停触发' }}</app-type>
    <TriggerHoverDemo />
  </section>

  <section data-demo="mousewheel">
    <app-type>{{ english ? 'Mousewheel Control' : '鼠标滚轮控制' }}</app-type>
    <MousewheelDemo />
  </section>

  <section data-demo="keyboard">
    <app-type>{{ english ? 'Keyboard Control' : '键盘控制' }}</app-type>
    <KeyboardDemo />
  </section>

  <section data-demo="custom-indicator">
    <app-type>{{ english ? 'Custom Indicator' : '自定义指示器' }}</app-type>
    <CustomIndicatorDemo />
  </section>

  <section data-demo="handle-change">
    <app-type>{{ english ? 'Handle Change' : '监听切换' }}</app-type>
    <HandleChangeDemo />
  </section>
  <section data-demo="controlled">
    <app-type>{{ english ? 'Controlled selection' : '受控切换' }}</app-type
    ><ControlledDemo />
  </section>
  <section data-demo="auto-sized">
    <app-type>{{ english ? 'Auto-sized slides' : '自动尺寸' }}</app-type
    ><AutoSizedDemo />
  </section>
  <section data-demo="interactive-content">
    <app-type>{{ english ? 'Interactive contents' : '交互内容' }}</app-type
    ><InteractiveContentDemo />
  </section>
</template>
