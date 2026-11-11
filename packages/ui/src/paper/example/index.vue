<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import LivePropertiesDemo from './demos/live-properties.vue'
import RippleDemo from './demos/ripple.vue'
import SlotDemo from './demos/slot.vue'
import ContentSurfaceComparison from './demos/surface-comparison.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="paper">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : 'basic usage' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="surface-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">边框与圆角对比</span><span lang="en-US">Borders and corner radii</span>
    </h3>
    <ContentSurfaceComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="slot">
    <app-type>{{ english ? 'Use Slot' : 'slot' }}</app-type>
    <SlotDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="live-properties">
    <app-type>{{ english ? 'Use Slot' : 'slot' }}</app-type>
    <LivePropertiesDemo />
  </section>

  <section data-demo="ripple">
    <app-type>{{ english ? 'Ripple Effect' : 'ripple' }}</app-type>
    <RippleDemo />
  </section>
</template>
