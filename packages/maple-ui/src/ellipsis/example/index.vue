<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import ExpandDemo from './demos/expand.vue'
import LineDemo from './demos/line.vue'
import MultipleLineDemo from './demos/multiple-line.vue'
import TooltipDemo from './demos/tooltip.vue'
import TwoWayBindingDemo from './demos/two-way-binding.vue'

const expand = ref(false)
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="line">
    <app-type>{{ english ? 'Single Line Ellipsis' : '单行省略' }}</app-type>
    <LineDemo />
  </section>

  <section data-demo="multiple-line">
    <app-type>{{ english ? 'Multiple Line Ellipsis' : '多行省略' }}</app-type>
    <MultipleLineDemo />
  </section>

  <section data-demo="two-way-binding">
    <app-type>{{ english ? 'Two-way Binding' : '双向绑定' }}</app-type>
    <TwoWayBindingDemo />
  </section>

  <section data-demo="expand">
    <app-type>{{ english ? 'Click On Text To Expand' : '点击文字展开' }}</app-type>
    <ExpandDemo />
  </section>

  <section data-demo="tooltip">
    <app-type>{{ english ? 'Custom Tooltip' : '自定义 Tooltip' }}</app-type>
    <TooltipDemo />
  </section>
</template>
