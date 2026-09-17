<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import BorderedDemo from './demos/bordered.vue'
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
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="bordered">
    <app-type>{{ english ? 'Border / Border with shadow' : '边框 / 边框与阴影' }}</app-type>
    <BorderedDemo />
  </section>

  <section data-demo="ripple">
    <app-type>{{ english ? 'Ripple Effect' : '水波效果' }}</app-type>
    <RippleDemo />
  </section>

  <section data-demo="round">
    <app-type>{{ english ? 'Rounded Paper' : '圆形纸张' }}</app-type>
    <RoundDemo />
  </section>

  <section data-demo="radius">
    <app-type>{{ english ? 'Custom Border Radius' : '自定义圆角' }}</app-type>
    <RadiusDemo />
  </section>

  <section data-demo="slot">
    <app-type>{{ english ? 'Use Slot' : '使用插槽' }}</app-type>
    <SlotDemo />
  </section>
</template>
