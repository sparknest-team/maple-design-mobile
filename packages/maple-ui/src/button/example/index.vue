<script setup lang="ts">
import { AppType, createDemoMessages, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoAutoLoading from './demos/auto-loading.vue'
import DemoBasic from './demos/basic.vue'
import DemoBlock from './demos/block.vue'
import DemoButtonGroup from './demos/button-group.vue'
import DemoCustomColor from './demos/custom-color.vue'
import DemoDisabled from './demos/disabled.vue'
import DemoLoading from './demos/loading.vue'
import DemoNativeEvents from './demos/native-events.vue'
import DemoRound from './demos/round.vue'
import DemoSize from './demos/size.vue'
import DemoStacked from './demos/stacked.vue'
import DemoVariants from './demos/variants.vue'
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
  <section data-demo="variants">
    <app-type>{{ t('variants') }}</app-type>
    <DemoVariants />
  </section>
  <section data-demo="size">
    <app-type>{{ t('size') }}</app-type>
    <DemoSize />
  </section>
  <section data-demo="disabled">
    <app-type>{{ t('disabled') }}</app-type>
    <DemoDisabled />
  </section>
  <section data-demo="loading">
    <app-type>{{ t('loading') }}</app-type>
    <DemoLoading />
  </section>
  <section data-demo="auto-loading">
    <app-type>{{ t('auto-loading') }}</app-type>
    <DemoAutoLoading />
  </section>
  <section data-demo="block">
    <app-type>{{ t('block') }}</app-type>
    <DemoBlock />
  </section>
  <section data-demo="custom-color">
    <app-type>{{ t('custom-color') }}</app-type>
    <DemoCustomColor />
  </section>
  <section data-demo="round">
    <app-type>{{ t('round') }}</app-type>
    <DemoRound />
  </section>
  <section data-demo="stacked">
    <app-type>{{ t('stacked') }}</app-type>
    <DemoStacked />
  </section>
  <section data-demo="button-group">
    <app-type>{{ t('button-group') }}</app-type>
    <DemoButtonGroup />
  </section>
  <section data-demo="native-events">
    <app-type>{{ t('native-events') }}</app-type>
    <DemoNativeEvents />
  </section>
</template>
