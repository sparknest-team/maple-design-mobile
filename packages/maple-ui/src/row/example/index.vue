<script setup lang="ts">
import { AppType, createDemoMessages, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import Demo2 from './demos/alignment.vue'
import Demo0 from './demos/basic.vue'
import Demo1 from './demos/gutter.vue'
import Demo4 from './demos/nested.vue'
import Demo3 from './demos/wrap.vue'
import messages from './messages.json'

const { t, use } = createDemoMessages(messages)

watchLang(use)
onThemeChange()
</script>
<template>
  <section aria-labelledby="layout-usage-title">
    <app-type id="layout-usage-title">{{ t('usageTitle') }}</app-type>
    <p>{{ t('usageGrid') }}</p>
    <p>{{ t('usageRowCol') }}</p>
    <p>{{ t('usageSpace') }}</p>
  </section>
  <section data-demo="basic">
    <app-type>{{ t('basic') }}</app-type
    ><Demo0 />
  </section>
  <section data-demo="gutter">
    <app-type>{{ t('gutter') }}</app-type
    ><Demo1 />
  </section>
  <section data-demo="alignment">
    <app-type>{{ t('alignment') }}</app-type
    ><Demo2 />
  </section>
  <section data-demo="wrap">
    <app-type>{{ t('wrap') }}</app-type
    ><Demo3 />
  </section>
  <section data-demo="nested">
    <app-type>{{ t('nested') }}</app-type
    ><Demo4 />
  </section>
</template>
