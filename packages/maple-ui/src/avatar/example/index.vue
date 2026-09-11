<script setup lang="ts">
import { AppType, createDemoMessages, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoAutoFix from './demos/auto-fix.vue'
import DemoBasic from './demos/basic.vue'
import DemoFallback from './demos/fallback.vue'
import DemoFit from './demos/fit.vue'
import DemoGroupVertical from './demos/group-vertical.vue'
import DemoGroup from './demos/group.vue'
import DemoHoverable from './demos/hoverable.vue'
import DemoImage from './demos/image.vue'
import DemoShape from './demos/shape.vue'
import DemoSize from './demos/size.vue'
import DemoStyle from './demos/style.vue'
import DemoTrigger from './demos/trigger.vue'
import messages from './messages.json'

const { t, use } = createDemoMessages(messages)

watchLang(use)
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ t('basic') }}</app-type>
    <DemoBasic />
  </section>
  <section data-demo="size">
    <app-type>{{ t('size') }}</app-type>
    <DemoSize />
  </section>
  <section data-demo="shape">
    <app-type>{{ t('shape') }}</app-type>
    <DemoShape />
  </section>
  <section data-demo="auto-fix">
    <app-type>{{ t('auto-fix') }}</app-type>
    <DemoAutoFix />
  </section>
  <section data-demo="image">
    <app-type>{{ t('image') }}</app-type>
    <DemoImage />
  </section>
  <section data-demo="fit">
    <app-type>{{ t('fit') }}</app-type>
    <DemoFit />
  </section>
  <section data-demo="fallback">
    <app-type>{{ t('fallback') }}</app-type>
    <DemoFallback />
  </section>
  <section data-demo="style">
    <app-type>{{ t('style') }}</app-type>
    <DemoStyle />
  </section>
  <section data-demo="group">
    <app-type>{{ t('group') }}</app-type>
    <DemoGroup />
  </section>
  <section data-demo="group-vertical">
    <app-type>{{ t('group-vertical') }}</app-type>
    <DemoGroupVertical />
  </section>
  <section data-demo="hoverable">
    <app-type>{{ t('hoverable') }}</app-type>
    <DemoHoverable />
  </section>
  <section data-demo="trigger">
    <app-type>{{ t('trigger') }}</app-type>
    <DemoTrigger />
  </section>
</template>
