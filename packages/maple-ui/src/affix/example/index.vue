<script setup lang="ts">
import { AppType, createDemoMessages, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoBasic from './demos/basic.vue'
import DemoBottom from './demos/bottom.vue'
import DemoContainer from './demos/container.vue'
import DemoControls from './demos/controls.vue'
import DemoFixChange from './demos/fix-change.vue'
import DemoTop from './demos/top.vue'
import messages from './messages.json'

const { t, use } = createDemoMessages(messages)

const { t, use } = createDemoMessages(messages)

const { t, use } = createDemoMessages(messages)

const { t, use } = createDemoMessages(messages)

watchLang(use)
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ t('basic') }}</app-type
    ><DemoBasic />
  </section>
  <section data-demo="top">
    <app-type>{{ t('top') }}</app-type
    ><DemoTop />
  </section>
  <section data-demo="bottom">
    <app-type>{{ t('bottom') }}</app-type
    ><DemoBottom />
  </section>
  <section data-demo="container">
    <app-type>{{ t('container') }}</app-type
    ><DemoContainer />
  </section>
  <section data-demo="fix-change">
    <app-type>{{ t('fix-change') }}</app-type
    ><DemoFixChange />
  </section>
  <section data-demo="controls">
    <app-type>{{ t('controls') }}</app-type>
    <DemoControls />
  </section>
</template>
