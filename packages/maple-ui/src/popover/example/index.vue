<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import AutoFitPopupWidthDemo from './demos/auto-fit-popup-width.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import DisabledDemo from './demos/disabled.vue'
import EventsDemo from './demos/events.vue'
import InteractiveDemo from './demos/interactive.vue'
import OffsetDemo from './demos/offset.vue'
import PlacementDemo from './demos/placement.vue'
import TriggerDemo from './demos/trigger.vue'
import TwoWayBindingDemo from './demos/two-way-binding.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="interactive">
    <app-type>{{ english ? 'Interactive content and retained state' : '交互内容与状态保留' }}</app-type>
    <InteractiveDemo />
  </section>

  <section data-demo="placement">
    <app-type>{{ english ? 'Placement and offset' : '位置、偏移与同宽' }}</app-type>
    <PlacementDemo />
  </section>

  <section data-demo="offset">
    <app-type>{{ english ? 'Placement and offset' : '位置、偏移与同宽' }}</app-type>
    <OffsetDemo />
  </section>

  <section data-demo="auto-fit-popup-width">
    <app-type>{{ english ? 'Placement and offset' : '位置、偏移与同宽' }}</app-type>
    <AutoFitPopupWidthDemo />
  </section>

  <section data-demo="trigger">
    <app-type>{{ english ? 'Trigger and controlled state' : '触发方式、受控状态与事件' }}</app-type>
    <TriggerDemo />
  </section>

  <section data-demo="two-way-binding">
    <app-type>{{ english ? 'Trigger and controlled state' : '触发方式、受控状态与事件' }}</app-type>
    <TwoWayBindingDemo />
  </section>

  <section data-demo="events">
    <app-type>{{ english ? 'Trigger and controlled state' : '触发方式、受控状态与事件' }}</app-type>
    <EventsDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Trigger and controlled state' : '触发方式、受控状态与事件' }}</app-type>
    <DisabledDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
