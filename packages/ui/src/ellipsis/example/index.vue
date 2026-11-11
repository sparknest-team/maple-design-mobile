<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="ellipsis">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="line">
    <app-type>{{ english ? 'Single line' : '单行省略' }}</app-type>
    <component :is="english ? LineEnDemo : LineDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="two-way-binding">
    <app-type>{{ english ? 'Controlled expansion' : '受控展开' }}</app-type>
    <component :is="english ? ModelEnDemo : ModelDemo" />
  </section>

  <section data-demo="tooltip">
    <app-type>{{ english ? 'Custom tooltip' : '自定义提示' }}</app-type>
    <component :is="english ? TooltipEnDemo : TooltipDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="data-and-options">
    <span lang="zh-CN">数据与选项</span>
    <span lang="en-US">Data and options</span>
  </h2>

  <section data-demo="multiple-line">
    <app-type>{{ english ? 'Multiple lines' : '多行省略' }}</app-type>
    <component :is="english ? MultipleEnDemo : MultipleDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="expand">
    <app-type>{{ english ? 'Interactive expansion' : '交互展开' }}</app-type>
    <component :is="english ? ExpandEnDemo : ExpandDemo" />
  </section>
</template>
