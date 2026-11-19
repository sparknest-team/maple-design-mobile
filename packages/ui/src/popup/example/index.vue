<script setup>
import { reactive, toRefs } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import BasicDemo from './demos/basic.vue'
import EventDemo from './demos/event.vue'
import ExplicitLoadingDemo from './demos/loading.vue'
import MotionTokenDemo from './demos/motion-token.vue'
import OverlayStyleDemo from './demos/overlay-style.vue'
import PopupPositionDemo from './demos/popup-position.vue'

const values = reactive({
  center: false,
  top: false,
  bottom: false,
  left: false,
  right: false,
  overlayClass: false,
  overlayStyle: false,
  event: false,
})
const { center, top, bottom, left, right, overlayClass, overlayStyle, event } = toRefs(values)

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="popup">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic"><BasicDemo /></section>

  <h2 class="mobile-demo-group-heading" data-demo-group="positioning-and-overlay">
    <span lang="zh-CN">位置与遮罩</span>
    <span lang="en-US">Positioning and overlay</span>
  </h2>

  <section data-demo="popup-position">
    <app-type>{{ english ? 'Placement' : '弹出位置' }}</app-type>
    <PopupPositionDemo />
  </section>

  <section data-demo="overlay-style">
    <app-type>{{ english ? 'Overlay style' : '遮罩样式' }}</app-type>
    <OverlayStyleDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="events-and-motion">
    <span lang="zh-CN">事件与动效</span>
    <span lang="en-US">Events and motion</span>
  </h2>

  <section data-demo="event">
    <app-type>{{ english ? 'Events' : '事件' }}</app-type>
    <EventDemo />
  </section>

  <section data-demo="motion-token">
    <app-type>{{ english ? 'Feature playground' : '功能调试' }}</app-type>
    <MotionTokenDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="loading-and-waiting">
    <span lang="zh-CN">加载与等待</span>
    <span lang="en-US">Loading and waiting</span>
  </h2>

  <section data-demo="loading">
    <h3>受控加载 / Controlled loading</h3>
    <ExplicitLoadingDemo />
  </section>
</template>
