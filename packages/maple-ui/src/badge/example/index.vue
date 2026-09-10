<script setup lang="ts">
import { AppType, createDemoMessages, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoBasic from './demos/basic.vue'
import DemoContent from './demos/content.vue'
import DemoDot from './demos/dot.vue'
import DemoInline from './demos/inline.vue'
import DemoMax from './demos/max.vue'
import DemoPosition from './demos/position.vue'
import DemoShow from './demos/show.vue'
import DemoSize from './demos/size.vue'
import DemoVariant from './demos/variant.vue'
import messages from './messages.json'

const { t, use } = createDemoMessages(messages)

watchLang(use)
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ t('basic') }}</app-type
    ><DemoBasic />
  </section>
  <section data-demo="inline">
    <app-type>{{ t('inline') }}</app-type
    ><DemoInline />
  </section>
  <section data-demo="dot">
    <app-type>{{ t('dot') }}</app-type
    ><DemoDot />
  </section>
  <section data-demo="content">
    <app-type>{{ t('content') }}</app-type
    ><DemoContent />
  </section>
  <section data-demo="max">
    <app-type>{{ t('max') }}</app-type
    ><DemoMax />
  </section>
  <section data-demo="color">
    <app-type>{{ t('color') }}</app-type
    ><DemoColor />
  </section>
  <section data-demo="size">
    <app-type>{{ t('size') }}</app-type
    ><DemoSize />
  </section>
  <section data-demo="position">
    <app-type>{{ t('position') }}</app-type
    ><DemoPosition />
  </section>
  <section data-demo="show">
    <app-type>{{ t('show') }}</app-type
    ><DemoShow />
  </section>
  <section data-demo="variant">
    <app-type>{{ t('variant') }}</app-type
    ><DemoVariant />
  </section>
</template>
