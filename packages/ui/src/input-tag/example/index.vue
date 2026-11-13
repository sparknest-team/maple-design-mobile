<script setup>
import { AppType } from '@maple-design/cli-vue/client'
import DemoAppearance from './demos/appearance-state-comparison.vue'
import Demo3 from './demos/async-fallback-restore.vue'
import Demo0 from './demos/basic.vue'
import Demo2 from './demos/fallback-option.vue'
import Demo1 from './demos/link-title.vue'
import Demo5 from './demos/loading.vue'
import Demo4 from './demos/max.vue'
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="input-tag">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>basic</app-type>
    <Demo0 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance-state-comparison">
    <app-type>标签输入尺寸与状态 / Tag input size and state</app-type>
    <DemoAppearance />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="max">
    <app-type>max</app-type>
    <Demo4 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="loading-and-waiting">
    <span lang="zh-CN">加载与等待</span>
    <span lang="en-US">Loading and waiting</span>
  </h2>

  <section data-demo="loading">
    <app-type>loading</app-type>
    <Demo5 />
  </section>

  <section data-demo="link-title">
    <app-type>link-title</app-type>
    <Demo1 />
  </section>

  <section data-demo="fallback-option">
    <app-type>fallback-option</app-type>
    <Demo2 />
  </section>

  <section data-demo="async-fallback-restore">
    <app-type>async-fallback-restore</app-type>
    <Demo3 />
  </section>
</template>
