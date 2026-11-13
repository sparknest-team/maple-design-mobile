<script setup>
import { AppType } from '@maple-design/cli-vue/client'
import Demo4 from './demos/async-fallback-restore.vue'
import Demo3 from './demos/async-read-pretty.vue'
import Demo1 from './demos/atomic-mention.vue'
import Demo0 from './demos/basic.vue'
import Demo6 from './demos/loading.vue'
import DemoMirror from './demos/mirror-lifecycle.vue'
import Demo5 from './demos/prefix.vue'
import Demo2 from './demos/search-options.vue'
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="mention">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>basic</app-type>
    <Demo0 />
  </section>

  <section data-demo="atomic-mention">
    <app-type>atomic-mention</app-type>
    <Demo1 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="data-and-options">
    <span lang="zh-CN">数据与选项</span>
    <span lang="en-US">Data and options</span>
  </h2>

  <section data-demo="search-options">
    <app-type>search-options</app-type>
    <Demo2 />
  </section>

  <section data-demo="async-read-pretty">
    <app-type>async-read-pretty</app-type>
    <Demo3 />
  </section>

  <section data-demo="async-fallback-restore">
    <app-type>async-fallback-restore</app-type>
    <Demo4 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="prefix">
    <app-type>prefix</app-type>
    <Demo5 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="lifecycle-and-edge-cases">
    <span lang="zh-CN">生命周期与边界</span>
    <span lang="en-US">Lifecycle and edge cases</span>
  </h2>

  <section data-demo="mirror-lifecycle">
    <app-type>镜像重定位生命周期 / Mirror positioning lifecycle</app-type>
    <DemoMirror />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="loading-and-waiting">
    <span lang="zh-CN">加载与等待</span>
    <span lang="en-US">Loading and waiting</span>
  </h2>

  <section data-demo="loading">
    <app-type>loading</app-type>
    <Demo6 />
  </section>
</template>
