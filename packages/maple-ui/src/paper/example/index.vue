<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import BorderedDemo from './demos/bordered.vue'
import LivePropertiesDemo from './demos/live-properties.vue'
import RadiusDemo from './demos/radius.vue'
import RippleDemo from './demos/ripple.vue'
import RoundDemo from './demos/round.vue'
import SlotDemo from './demos/slot.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : 'basic usage' }}</app-type>
    <BasicUsageDemo />
  </section>
  <section data-demo="bordered">
    <app-type>{{ english ? 'Border / Border with shadow' : 'bordered' }}</app-type>
    <BorderedDemo />
  </section>

  <section data-demo="ripple">
    <app-type>{{ english ? 'Ripple Effect' : 'ripple' }}</app-type>
    <RippleDemo />
  </section>

  <section data-demo="round">
    <app-type>{{ english ? 'Rounded Paper' : 'round' }}</app-type>
    <RoundDemo />
  </section>

  <section data-demo="radius">
    <app-type>{{ english ? 'Custom Border Radius' : 'radius' }}</app-type>
    <RadiusDemo />
  </section>

  <section data-demo="slot">
    <app-type>{{ english ? 'Use Slot' : 'slot' }}</app-type>
    <SlotDemo />
  </section>

  <section data-demo="live-properties">
    <app-type>{{ english ? 'Use Slot' : 'slot' }}</app-type>
    <LivePropertiesDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
