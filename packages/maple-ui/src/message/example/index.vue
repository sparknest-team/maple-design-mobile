<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
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
  <section data-demo="function-call">
    <app-type>{{ english ? 'Function Calls' : '函数调用' }}</app-type>
    <FunctionCallDemo />
  </section>
  <section data-demo="type">
    <app-type>{{ english ? 'Statuses' : '消息状态' }}</app-type>
    <TypeDemo />
  </section>

  <section data-demo="component-call">
    <app-type>{{ english ? 'Component Usage' : '组件调用' }}</app-type>
    <ComponentCallDemo />
  </section>

  <section data-demo="variant">
    <app-type>{{ english ? 'Component Usage' : '组件调用' }}</app-type>
    <VariantDemo />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
