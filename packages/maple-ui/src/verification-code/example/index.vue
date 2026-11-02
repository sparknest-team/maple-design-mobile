<script setup>
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import GroupedAppearanceLabDemo from './demos/appearance-lab.vue'
import appearance from './demos/appearance.vue'
import basic from './demos/basic.vue'
import appearanceEn from './demos/en-US/appearance.vue'
import basicEn from './demos/en-US/basic.vue'
import formattingEn from './demos/en-US/formatting.vue'
import statesEn from './demos/en-US/states.vue'
import formatting from './demos/formatting.vue'
import GroupedStateLabDemo from './demos/state-lab.vue'
import states from './demos/states.vue'

const language = ref('zh-CN')
watchLang((lang) => {
  language.value = lang
})
const english = computed(() => language.value === 'en-US')
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="verification-code">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic"><component :is="english ? basicEn : basic" /></section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance"><component :is="english ? appearanceEn : appearance" /></section>

  <section data-demo="appearance-lab">
    <h3 class="app-type mobile-demo-case-heading">
      <span lang="zh-CN">外观组合</span><span lang="en-US">Appearance combinations</span>
    </h3>
    <GroupedAppearanceLabDemo />
  </section>

  <section data-demo="states"><component :is="english ? statesEn : states" /></section>

  <h2 class="mobile-demo-group-heading" data-demo-group="data-and-options">
    <span lang="zh-CN">数据与选项</span>
    <span lang="en-US">Data and options</span>
  </h2>

  <section data-demo="formatting"><component :is="english ? formattingEn : formatting" /></section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="state-lab">
    <h3 class="app-type mobile-demo-case-heading">
      <span lang="zh-CN">交互状态切换</span><span lang="en-US">Interaction states</span>
    </h3>
    <GroupedStateLabDemo />
  </section>
</template>
