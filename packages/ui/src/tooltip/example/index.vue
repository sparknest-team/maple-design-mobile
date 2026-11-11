<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ContentSlotDemo from './demos/content-slot.vue'
import CustomColorDemo from './demos/custom-color.vue'
import DisabledDemo from './demos/disabled.vue'
import EventsDemo from './demos/events.vue'
import OffsetDemo from './demos/offset.vue'
import PlacementDemo from './demos/placement.vue'
import TriggerDemo from './demos/trigger.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="tooltip">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="custom-color">
    <app-type>{{ english ? 'Content, status and color' : '内容、主题与颜色' }}</app-type>
    <CustomColorDemo />
  </section>

  <section data-demo="appearance-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">外观配置对比</span><span lang="en-US">Appearance configuration comparison</span>
    </h3>
    <OrganizedAppearanceLab />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

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

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="content-slot">
    <app-type>{{ english ? 'Content, status and color' : '内容、主题与颜色' }}</app-type>
    <ContentSlotDemo />
  </section>

  <section data-demo="events">
    <app-type>{{ english ? 'Events and disabled state' : '事件与禁用' }}</app-type>
    <EventsDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Events and disabled state' : '事件与禁用' }}</app-type>
    <DisabledDemo />
  </section>
</template>
