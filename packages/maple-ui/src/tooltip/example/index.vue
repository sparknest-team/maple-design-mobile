<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ContentSlotDemo from './demos/content-slot.vue'
import CustomColorDemo from './demos/custom-color.vue'
import DisabledDemo from './demos/disabled.vue'
import EventsDemo from './demos/events.vue'
import OffsetDemo from './demos/offset.vue'
import PlacementDemo from './demos/placement.vue'
import SizeDemo from './demos/size.vue'
import ThemeColorTooltipDemo from './demos/theme-color-tooltip.vue'
import TriggerDemo from './demos/trigger.vue'

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

  <section data-demo="size">
    <app-type>{{ english ? 'Size' : '尺寸' }}</app-type>
    <SizeDemo />
  </section>

  <section data-demo="content-slot">
    <app-type>{{ english ? 'Content, status and color' : '内容、主题与颜色' }}</app-type>
    <ContentSlotDemo />
  </section>

  <section data-demo="theme-color-tooltip">
    <app-type>{{ english ? 'Content, status and color' : '内容、主题与颜色' }}</app-type>
    <ThemeColorTooltipDemo />
  </section>

  <section data-demo="custom-color">
    <app-type>{{ english ? 'Content, status and color' : '内容、主题与颜色' }}</app-type>
    <CustomColorDemo />
  </section>

  <section data-demo="placement">
    <app-type>{{ english ? 'Placement, offset and trigger' : '位置、偏移与触发' }}</app-type>
    <PlacementDemo />
  </section>

  <section data-demo="offset">
    <app-type>{{ english ? 'Placement, offset and trigger' : '位置、偏移与触发' }}</app-type>
    <OffsetDemo />
  </section>

  <section data-demo="trigger">
    <app-type>{{ english ? 'Placement, offset and trigger' : '位置、偏移与触发' }}</app-type>
    <TriggerDemo />
  </section>

  <section data-demo="events">
    <app-type>{{ english ? 'Events and disabled state' : '事件与禁用' }}</app-type>
    <EventsDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Events and disabled state' : '事件与禁用' }}</app-type>
    <DisabledDemo />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
