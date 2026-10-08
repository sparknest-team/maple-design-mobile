<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import ExpandEnDemo from './demos/en-US/expand.vue'
import LineEnDemo from './demos/en-US/line.vue'
import MultipleEnDemo from './demos/en-US/multiple-line.vue'
import TooltipEnDemo from './demos/en-US/tooltip.vue'
import ModelEnDemo from './demos/en-US/two-way-binding.vue'
import ExpandDemo from './demos/expand.vue'
import LineDemo from './demos/line.vue'
import MultipleDemo from './demos/multiple-line.vue'
import TooltipDemo from './demos/tooltip.vue'
import ModelDemo from './demos/two-way-binding.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="line">
    <app-type>{{ english ? 'Single line' : '单行省略' }}</app-type>
    <component :is="english ? LineEnDemo : LineDemo" />
  </section>

  <section data-demo="multiple-line">
    <app-type>{{ english ? 'Multiple lines' : '多行省略' }}</app-type>
    <component :is="english ? MultipleEnDemo : MultipleDemo" />
  </section>

  <section data-demo="expand">
    <app-type>{{ english ? 'Interactive expansion' : '交互展开' }}</app-type>
    <component :is="english ? ExpandEnDemo : ExpandDemo" />
  </section>

  <section data-demo="two-way-binding">
    <app-type>{{ english ? 'Controlled expansion' : '受控展开' }}</app-type>
    <component :is="english ? ModelEnDemo : ModelDemo" />
  </section>

  <section data-demo="tooltip">
    <app-type>{{ english ? 'Custom tooltip' : '自定义提示' }}</app-type>
    <component :is="english ? TooltipEnDemo : TooltipDemo" />
  </section>
</template>
