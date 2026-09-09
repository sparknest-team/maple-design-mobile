<script setup lang="ts">
import { AppType, createDemoMessages, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoBasic from './demos/basic.vue'
import DemoFloating from './demos/floating.vue'
import DemoHoverable from './demos/hoverable.vue'
import DemoImage from './demos/image.vue'
import DemoNoPadding from './demos/no-padding.vue'
import DemoRipple from './demos/ripple.vue'
import DemoSize from './demos/size.vue'
import DemoSlots from './demos/slots.vue'
import DemoTooltip from './demos/tooltip.vue'
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
  <section data-demo="no-padding">
    <app-type>{{ t('no-padding') }}</app-type
    ><DemoNoPadding />
  </section>
  <section data-demo="hoverable">
    <app-type>{{ t('hoverable') }}</app-type
    ><DemoHoverable />
  </section>
  <section data-demo="variant">
    <app-type>{{ t('variant') }}</app-type
    ><DemoVariant />
  </section>
  <section data-demo="image">
    <app-type>{{ t('image') }}</app-type
    ><DemoImage />
  </section>
  <section data-demo="size">
    <app-type>{{ t('size') }}</app-type
    ><DemoSize />
  </section>
  <section data-demo="tooltip">
    <app-type>{{ t('tooltip') }}</app-type
    ><DemoTooltip />
  </section>
  <section data-demo="slots">
    <app-type>{{ t('slots') }}</app-type
    ><DemoSlots />
  </section>
  <section data-demo="ripple">
    <app-type>{{ t('ripple') }}</app-type
    ><DemoRipple />
  </section>
  <section data-demo="floating">
    <app-type>{{ t('floating') }}</app-type
    ><DemoFloating />
  </section>
</template>
