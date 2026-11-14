<script setup lang="ts">
import { onThemeChange } from '@maple-design/cli-vue/client'
import Demo8 from './demos/api-review.vue'
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
  <section data-demo="basic">
    <h2>basic</h2>
    <Demo0 />
  </section>
  <section data-demo="type">
    <h2>type</h2>
    <Demo1 />
  </section>
  <section data-demo="layout-comparison">
    <h2>layout-comparison</h2>
    <Demo2 />
  </section>
  <section data-demo="pending">
    <h2>pending</h2>
    <Demo3 />
  </section>
  <section data-demo="mode">
    <h2>mode</h2>
    <Demo4 />
  </section>
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
  <section data-demo="api-review">
    <h2>api-review</h2>
    <Demo8 />
  </section>
</template>
