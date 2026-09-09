<script setup lang="ts">
import { AppType, createDemoMessages, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import Demo0 from './demos/basic.vue'
import Demo1 from './demos/collapse.vue'
import Demo3 from './demos/dynamic.vue'
import Demo2 from './demos/responsive.vue'
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
  <section data-demo="collapse">
    <app-type>{{ t('collapse') }}</app-type
    ><Demo1 />
  </section>
  <section data-demo="responsive">
    <app-type>{{ t('responsive') }}</app-type
    ><Demo2 />
  </section>
  <section data-demo="dynamic">
    <app-type>{{ t('dynamic') }}</app-type
    ><Demo3 />
  </section>
</template>
