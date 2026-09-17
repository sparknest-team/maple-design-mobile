<script setup>
import { AppType, onThemeChange } from '@maplejs/maple-cli/client'
import Demo1Demo from './demos/demo-1.vue'
import Demo2Demo from './demos/demo-2.vue'
import Demo3Demo from './demos/demo-3.vue'
import Demo4Demo from './demos/demo-4.vue'
import Demo5Demo from './demos/demo-5.vue'
import Demo6Demo from './demos/demo-6.vue'

onThemeChange()
</script>

<template>
  <section data-demo="demo-1">
    <app-type>基础用法</app-type>
    <Demo1Demo />
  </section>

  <section data-demo="demo-2">
    <app-type>外观</app-type>
    <Demo2Demo />
  </section>

  <section data-demo="demo-3">
    <app-type>Hint</app-type>
    <Demo3Demo />
  </section>

  <section data-demo="demo-4">
    <app-type>尺寸</app-type>
    <Demo4Demo />
  </section>

  <section data-demo="demo-5">
    <app-type>字数限制与调整高度</app-type>
    <Demo5Demo />
  </section>

  <section data-demo="demo-6">
    <app-type>状态</app-type>
    <Demo6Demo />
  </section>
</template>
