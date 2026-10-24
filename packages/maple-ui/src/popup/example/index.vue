<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import EventDemo from './demos/event.vue'
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
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="popup-position">
    <app-type>{{ english ? 'Placement' : '弹出位置' }}</app-type>
    <PopupPositionDemo />
  </section>

  <section data-demo="overlay-style">
    <app-type>{{ english ? 'Overlay style' : '遮罩样式' }}</app-type>
    <OverlayStyleDemo />
  </section>

  <section data-demo="event">
    <app-type>{{ english ? 'Events' : '事件' }}</app-type>
    <EventDemo />
  </section>
  <section data-demo="motion-token">
    <app-type>{{ english ? 'Feature playground' : '功能调试' }}</app-type>
    <MotionTokenDemo :english="english" />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
