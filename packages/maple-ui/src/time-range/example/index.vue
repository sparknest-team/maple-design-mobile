<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import ClockModeDemo from './demos/clock-mode.vue'
import DisabledDemo from './demos/disabled.vue'
import Hour24Demo from './demos/hour24.vue'
import NextDayDemo from './demos/next-day.vue'
import PickerSecondsDemo from './demos/picker-seconds.vue'
import SeparatorDemo from './demos/separator.vue'
import WithFormItemDemo from './demos/with-form-item.vue'

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

  <section data-demo="clock-mode">
    <app-type>{{ english ? 'Clock Mode' : '时钟模式' }}</app-type>
    <ClockModeDemo />
  </section>

  <section data-demo="picker-seconds">
    <app-type>{{ english ? 'Picker With Seconds' : '列滚轮含秒' }}</app-type>
    <PickerSecondsDemo />
  </section>

  <section data-demo="hour24">
    <app-type>{{ english ? '24hr And Seconds' : '24 小时制与秒' }}</app-type>
    <Hour24Demo />
  </section>

  <section data-demo="separator">
    <app-type>{{ english ? 'Custom Separator' : '自定义分隔符' }}</app-type>
    <SeparatorDemo />
  </section>

  <section data-demo="next-day">
    <app-type>{{ english ? 'Next Day Label' : '次日标记' }}</app-type>
    <NextDayDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="with-form-item">
    <app-type>{{ english ? 'With FormItem' : '搭配 FormItem' }}</app-type>
    <WithFormItemDemo />
  </section>
</template>
