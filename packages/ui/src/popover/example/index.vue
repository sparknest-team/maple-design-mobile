<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import DisabledDemo from './demos/disabled.vue'
import EventsDemo from './demos/events.vue'
import InteractiveDemo from './demos/interactive.vue'
import ContentPositioningComparison from './demos/positioning-comparison.vue'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="popover">
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

  <section data-demo="disabled">
    <app-type>{{ english ? 'Trigger and controlled state' : '触发方式、受控状态与事件' }}</app-type>
    <DisabledDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="positioning-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">位置、偏移与宽度</span><span lang="en-US">Placement, offset and width</span>
    </h3>
    <ContentPositioningComparison />
  </section>

  <section data-demo="trigger">
    <app-type>{{ english ? 'Trigger and controlled state' : '触发方式、受控状态与事件' }}</app-type>
    <TriggerDemo />
  </section>

  <section data-demo="two-way-binding">
    <app-type>{{ english ? 'Trigger and controlled state' : '触发方式、受控状态与事件' }}</app-type>
    <TwoWayBindingDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="interactive">
    <app-type>{{ english ? 'Interactive content and retained state' : '交互内容与状态保留' }}</app-type>
    <InteractiveDemo />
  </section>

  <section data-demo="events">
    <app-type>{{ english ? 'Trigger and controlled state' : '触发方式、受控状态与事件' }}</app-type>
    <EventsDemo />
  </section>
</template>
