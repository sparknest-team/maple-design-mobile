<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import ComponentCallDemo from './demos/component-call.vue'
import FunctionCallDemo from './demos/function-call.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="action-sheet">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="function-call">
    <app-type>{{ english ? 'Function Call' : '函数调用' }}</app-type>
    <FunctionCallDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="declarative-usage-and-state">
    <span lang="zh-CN">声明式与状态控制</span>
    <span lang="en-US">Declarative usage and state</span>
  </h2>

  <section data-demo="component-call">
    <app-type>{{ english ? 'Component Call' : '组件调用' }}</app-type>
    <ComponentCallDemo />
  </section>
</template>
