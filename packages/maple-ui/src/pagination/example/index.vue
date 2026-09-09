<script setup lang="ts">
import { AppType, createDemoMessages, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import Demo7 from './demos/all.vue'
import Demo10 from './demos/auto-adjust.vue'
import Demo0 from './demos/basic.vue'
import Demo8 from './demos/custom-page-button.vue'
import Demo9 from './demos/disabled.vue'
import Demo1 from './demos/more-page-size.vue'
import Demo11 from './demos/responsive.vue'
import Demo3 from './demos/show-jumper.vue'
import Demo2 from './demos/show-page-size.vue'
import Demo6 from './demos/show-total.vue'
import Demo5 from './demos/simple.vue'
import Demo4 from './demos/size.vue'
import messages from './messages.json'

const { t, use } = createDemoMessages(messages)

watchLang(use)
onThemeChange()
</script>
<template>
  <section data-demo="basic">
    <app-type>{{ t('basic') }}</app-type
    ><Demo0 />
  </section>
  <section data-demo="more-page-size">
    <app-type>{{ t('more-page-size') }}</app-type
    ><Demo1 />
  </section>
  <section data-demo="show-page-size">
    <app-type>{{ t('show-page-size') }}</app-type
    ><Demo2 />
  </section>
  <section data-demo="show-jumper">
    <app-type>{{ t('show-jumper') }}</app-type
    ><Demo3 />
  </section>
  <section data-demo="size">
    <app-type>{{ t('size') }}</app-type
    ><Demo4 />
  </section>
  <section data-demo="simple">
    <app-type>{{ t('simple') }}</app-type
    ><Demo5 />
  </section>
  <section data-demo="show-total">
    <app-type>{{ t('show-total') }}</app-type
    ><Demo6 />
  </section>
  <section data-demo="all">
    <app-type>{{ t('all') }}</app-type
    ><Demo7 />
  </section>
  <section data-demo="custom-page-button">
    <app-type>{{ t('custom-page-button') }}</app-type
    ><Demo8 />
  </section>
  <section data-demo="disabled">
    <app-type>{{ t('disabled') }}</app-type
    ><Demo9 />
  </section>
  <section data-demo="auto-adjust">
    <app-type>{{ t('auto-adjust') }}</app-type
    ><Demo10 />
  </section>
  <section data-demo="responsive">
    <app-type>{{ t('responsive') }}</app-type
    ><Demo11 />
  </section>
</template>
