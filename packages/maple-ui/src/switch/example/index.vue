<script setup lang="ts">
import { AppType, createDemoMessages, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoBasic from './demos/basic.vue'
import DemoCustomColor from './demos/custom-color.vue'
import DemoCustomIcon from './demos/custom-icon.vue'
import DemoCustomText from './demos/custom-text.vue'
import DemoCustomValue from './demos/custom-value.vue'
import DemoCustom from './demos/custom.vue'
import DemoDisabled from './demos/disabled.vue'
import DemoEvents from './demos/events.vue'
import DemoLoading from './demos/loading.vue'
import DemoReadonly from './demos/readonly.vue'
import DemoSize from './demos/size.vue'
import DemoSwitchInterception from './demos/switch-interception.vue'
import DemoType from './demos/type.vue'
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
  <section data-demo="type">
    <app-type>{{ t('type') }}</app-type
    ><DemoType />
  </section>
  <section data-demo="size">
    <app-type>{{ t('size') }}</app-type
    ><DemoSize />
  </section>
  <section data-demo="disabled">
    <app-type>{{ t('disabled') }}</app-type
    ><DemoDisabled />
  </section>
  <section data-demo="readonly">
    <app-type>{{ t('readonly') }}</app-type
    ><DemoReadonly />
  </section>
  <section data-demo="loading">
    <app-type>{{ t('loading') }}</app-type
    ><DemoLoading />
  </section>
  <section data-demo="custom-color">
    <app-type>{{ t('custom-color') }}</app-type
    ><DemoCustomColor />
  </section>
  <section data-demo="custom-text">
    <app-type>{{ t('custom-text') }}</app-type
    ><DemoCustomText />
  </section>
  <section data-demo="custom-icon">
    <app-type>{{ t('custom-icon') }}</app-type
    ><DemoCustomIcon />
  </section>
  <section data-demo="custom">
    <app-type>{{ t('custom') }}</app-type
    ><DemoCustom />
  </section>
  <section data-demo="custom-value">
    <app-type>{{ t('custom-value') }}</app-type
    ><DemoCustomValue />
  </section>
  <section data-demo="switch-interception">
    <app-type>{{ t('switch-interception') }}</app-type
    ><DemoSwitchInterception />
  </section>
  <section data-demo="events">
    <app-type>{{ t('events') }}</app-type>
    <DemoEvents />
  </section>
</template>
