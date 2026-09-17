<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AutoFitPopupWidthDemo from './demos/auto-fit-popup-width.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import DisabledDemo from './demos/disabled.vue'
import EventsDemo from './demos/events.vue'
import OffsetDemo from './demos/offset.vue'
import PlacementDemo from './demos/placement.vue'
import TriggerDemo from './demos/trigger.vue'
import TwoWayBindingDemo from './demos/two-way-binding.vue'

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

  <section data-demo="placement">
    <app-type>{{ english ? 'Placement' : '弹出位置' }}</app-type>
    <PlacementDemo />
  </section>

  <section data-demo="offset">
    <app-type>{{ english ? 'Offset' : '偏移量' }}</app-type>
    <OffsetDemo />
  </section>

  <section data-demo="auto-fit-popup-width">
    <app-type>{{ english ? 'Same Width As Trigger Element' : '与触发元素同宽' }}</app-type>
    <AutoFitPopupWidthDemo />
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
    <app-type>{{ english ? 'Disabled' : '禁用气泡卡片' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="two-way-binding">
    <app-type>{{ english ? 'Two-way Binding' : '双向绑定' }}</app-type>
    <TwoWayBindingDemo />
  </section>
</template>
