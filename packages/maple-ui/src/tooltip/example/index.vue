<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import ContentSlotDemo from './demos/content-slot.vue'
import CustomColorDemo from './demos/custom-color.vue'
import DisabledDemo from './demos/disabled.vue'
import EventsDemo from './demos/events.vue'
import OffsetDemo from './demos/offset.vue'
import PlacementDemo from './demos/placement.vue'
import ThemeColorTooltipDemo from './demos/theme-color-tooltip.vue'
import TriggerDemo from './demos/trigger.vue'

const trigger = ref('click')
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

  <section data-demo="content-slot">
    <app-type>{{ english ? 'Content Slot' : '内容插槽' }}</app-type>
    <ContentSlotDemo />
  </section>

  <section data-demo="placement">
    <app-type>{{ english ? 'Placement' : '弹出位置' }}</app-type>
    <PlacementDemo />
  </section>

  <section data-demo="theme-color-tooltip">
    <app-type>{{ english ? 'Theme Color' : '主题色' }}</app-type>
    <ThemeColorTooltipDemo />
  </section>

  <section data-demo="custom-color">
    <app-type>{{ english ? 'Custom Color' : '自定义颜色' }}</app-type>
    <CustomColorDemo />
  </section>

  <section data-demo="offset">
    <app-type>{{ english ? 'Offset' : '偏移量' }}</app-type>
    <OffsetDemo />
  </section>

  <section data-demo="trigger">
    <app-type>{{ english ? 'Trigger' : '触发方式' }}</app-type>
    <TriggerDemo />
  </section>

  <section data-demo="events">
    <app-type>{{ english ? 'Events' : '注册事件' }}</app-type>
    <EventsDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用提示' }}</app-type>
    <DisabledDemo />
  </section>
</template>
