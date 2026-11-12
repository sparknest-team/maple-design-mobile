<script setup>
import { AppType } from '@maple-design/cli-vue/client'
import Demo4 from './demos/async-fallback-restore.vue'
import Demo3 from './demos/async-read-pretty.vue'
import Demo1 from './demos/atomic-mention.vue'
import Demo0 from './demos/basic.vue'
import Demo6 from './demos/loading.vue'
import Demo5 from './demos/prefix.vue'
import Demo2 from './demos/search-options.vue'
</script>
<template>
  <section data-demo="basic">
    <app-type>basic</app-type>
    <Demo0 />
  </section>
  <section data-demo="atomic-mention">
    <app-type>atomic-mention</app-type>
    <Demo1 />
  </section>
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
  <section data-demo="prefix">
    <app-type>prefix</app-type>
    <Demo5 />
  </section>
  <section data-demo="loading">
    <app-type>loading</app-type>
    <Demo6 />
  </section>
</template>
