<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="message">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="function-call">
    <app-type>{{ english ? 'Function Calls' : '函数调用' }}</app-type>
    <FunctionCallDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="type">
    <app-type>{{ english ? 'Statuses' : '消息状态' }}</app-type>
    <TypeDemo />
  </section>

  <section data-demo="variant">
    <app-type>{{ english ? 'Component Usage' : '组件调用' }}</app-type>
    <VariantDemo />
  </section>

  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="component-call">
    <app-type>{{ english ? 'Component Usage' : '组件调用' }}</app-type>
    <ComponentCallDemo />
  </section>
</template>
