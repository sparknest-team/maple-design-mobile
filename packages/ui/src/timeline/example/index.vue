<script setup lang="ts">
import { onThemeChange } from '@maple-design/cli-vue/client'
import Demo0 from './demos/basic.vue'
import Demo7 from './demos/custom.vue'
import Demo6 from './demos/dot.vue'
import Demo5 from './demos/icon.vue'
import Demo2 from './demos/layout-comparison.vue'
import Demo4 from './demos/mode.vue'
import Demo3 from './demos/pending.vue'
import Demo1 from './demos/type.vue'

onThemeChange()
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="timeline">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <h2>basic</h2>
    <Demo0 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="type">
    <h2>type</h2>
    <Demo1 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="layout-comparison">
    <h2>layout-comparison</h2>
    <Demo2 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="pending">
    <h2>pending</h2>
    <Demo3 />
  </section>

  <section data-demo="mode">
    <h2>mode</h2>
    <Demo4 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="icon">
    <h2>icon</h2>
    <Demo5 />
  </section>

  <section data-demo="dot">
    <h2>dot</h2>
    <Demo6 />
  </section>

  <section data-demo="custom">
    <h2>custom</h2>
    <Demo7 />
  </section>
</template>
