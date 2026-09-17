<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import EventDemo from './demos/event.vue'
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
    <app-type>{{ english ? 'Popup Position' : '弹出位置' }}</app-type>
    <PopupPositionDemo />
  </section>

  <section data-demo="overlay-style">
    <app-type>{{ english ? 'Overlay Style' : '背景层样式' }}</app-type>
    <OverlayStyleDemo />
  </section>

  <section data-demo="event">
    <app-type>{{ english ? 'Event' : '注册事件' }}</app-type>
    <EventDemo />
  </section>
</template>
