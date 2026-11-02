<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="hover">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="style-binding">
    <app-type>{{ english ? 'Style Binding' : '样式绑定' }}</app-type>
    <StyleBindingDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="function-binding">
    <app-type>{{ english ? 'Function Binding' : '函数绑定' }}</app-type>
    <FunctionBindingDemo />
  </section>
</template>
