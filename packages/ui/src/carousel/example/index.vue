<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import AutoSizedDemo from './demos/auto-sized.vue'
import AutoplayHoverPauseDemo from './demos/autoplay-hover-pause.vue'
import AutoplayDemo from './demos/autoplay.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CenteredSlidesDemo from './demos/centered-slides.vue'
import ControlledDemo from './demos/controlled.vue'
import CustomIndicatorDemo from './demos/custom-indicator.vue'
import ContentEffectComparison from './demos/effect-comparison.vue'
import ForbidLoopDemo from './demos/forbid-loop.vue'
import HandleChangeDemo from './demos/handle-change.vue'
import ContentIndicatorComparison from './demos/indicator-comparison.vue'
import InteractiveContentDemo from './demos/interactive-content.vue'
import KeyboardDemo from './demos/keyboard.vue'
import MousewheelDemo from './demos/mousewheel.vue'
import MultiSlidesDemo from './demos/multi-slides.vue'
import NavigationDemo from './demos/navigation.vue'
import OrganizedSchedulerLifecycle from './demos/scheduler-lifecycle.vue'
import TriggerHoverDemo from './demos/trigger-hover.vue'
import VerticalDemo from './demos/vertical.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="carousel">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="direction-and-layout">
    <span lang="zh-CN">方向与布局</span>
    <span lang="en-US">Direction and layout</span>
  </h2>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical Carousel' : '垂直轮播' }}</app-type>
    <VerticalDemo />
  </section>

  <section data-demo="multi-slides">
    <app-type>{{ english ? 'Multiple Slides Per View' : '多图同屏' }}</app-type>
    <MultiSlidesDemo />
  </section>

  <section data-demo="centered-slides">
    <app-type>{{ english ? 'Centered Slides' : '居中当前滑块' }}</app-type>
    <CenteredSlidesDemo />
  </section>

  <section data-demo="auto-sized">
    <app-type>{{ english ? 'auto-sized' : 'auto-sized' }}</app-type
    ><AutoSizedDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="navigation-and-effects">
    <span lang="zh-CN">切换控件与效果</span>
    <span lang="en-US">Navigation and effects</span>
  </h2>

  <section data-demo="navigation">
    <app-type>{{ english ? 'Navigation Arrows' : '切换箭头' }}</app-type>
    <NavigationDemo />
  </section>

  <section data-demo="indicator-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">指示器样式与位置</span><span lang="en-US">Indicator style and position</span>
    </h3>
    <ContentIndicatorComparison />
  </section>

  <section data-demo="effect-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">切换效果对比</span><span lang="en-US">Transition effects</span>
    </h3>
    <ContentEffectComparison />
  </section>

  <section data-demo="custom-indicator">
    <app-type>{{ english ? 'Custom Indicator' : '自定义指示器' }}</app-type>
    <CustomIndicatorDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="playback-and-interaction">
    <span lang="zh-CN">播放与交互</span>
    <span lang="en-US">Playback and interaction</span>
  </h2>

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

  <section data-demo="handle-change">
    <app-type>{{ english ? 'Handle Change' : '监听切换' }}</app-type>
    <HandleChangeDemo />
  </section>

  <section data-demo="controlled">
    <app-type>{{ english ? 'controlled' : 'controlled' }}</app-type
    ><ControlledDemo />
  </section>

  <section data-demo="interactive-content">
    <app-type>{{ english ? 'interactive-content' : 'interactive-content' }}</app-type
    ><InteractiveContentDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="lifecycle">
    <span lang="zh-CN">生命周期</span>
    <span lang="en-US">Lifecycle</span>
  </h2>

  <section data-demo="scheduler-lifecycle">
    <app-type>{{ english ? 'scheduler-lifecycle' : 'Scheduler lifecycle / 调度生命周期' }}</app-type>
    <OrganizedSchedulerLifecycle />
  </section>
</template>
