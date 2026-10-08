<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import ComponentCallDemo from './demos/component-call.vue'
import FunctionCallDemo from './demos/function-call.vue'
import TypeDemo from './demos/type.vue'
import VariantDemo from './demos/variant.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="variant">
    <app-type>{{ english ? 'Visual Variants' : '视觉变体' }}</app-type>
    <VariantDemo />
  </section>
  <section data-demo="function-call">
    <app-type>{{ english ? 'Function Call' : '函数调用' }}</app-type>
    <FunctionCallDemo />
  </section>

  <section data-demo="type">
    <app-type>{{ english ? 'Message Type' : '消息类型' }}</app-type>
    <TypeDemo />
  </section>

  <section data-demo="component-call">
    <app-type>{{ english ? 'Component Call' : '组件调用' }}</app-type>
    <ComponentCallDemo />
  </section>
</template>
