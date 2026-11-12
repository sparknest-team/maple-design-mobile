<script setup>
import { AppType } from '@maple-design/cli-vue/client'
import Demo3 from './demos/async-fallback-restore.vue'
import Demo0 from './demos/basic.vue'
import Demo2 from './demos/fallback-option.vue'
import Demo1 from './demos/link-title.vue'
import Demo5 from './demos/loading.vue'
import Demo4 from './demos/max.vue'
</script>
<template>
  <section data-demo="basic">
    <app-type>basic</app-type>
    <Demo0 />
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
  <section data-demo="max">
    <app-type>max</app-type>
    <Demo4 />
  </section>
  <section data-demo="loading">
    <app-type>loading</app-type>
    <Demo5 />
  </section>
</template>
