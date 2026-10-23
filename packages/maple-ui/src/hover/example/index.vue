<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import FunctionBindingDemo from './demos/function-binding.vue'
import StyleBindingDemo from './demos/style-binding.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="style-binding">
    <app-type>{{ english ? 'Style Binding' : '样式绑定' }}</app-type>
    <StyleBindingDemo />
  </section>

  <section data-demo="function-binding">
    <app-type>{{ english ? 'Function Binding' : '函数绑定' }}</app-type>
    <FunctionBindingDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
