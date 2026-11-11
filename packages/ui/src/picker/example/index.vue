<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import AreaPickerDemo from './demos/area-picker.vue'
import CascadePickerDemo from './demos/cascade-picker.vue'
import ColumnsCountDemo from './demos/columns-count.vue'
import DisabledDemo from './demos/disabled.vue'
import FunctionCallDemo from './demos/function-call.vue'
import MultiplePickerDemo from './demos/multiple-picker.vue'
import SinglePickerDemo from './demos/single-picker.vue'
import TwoWayBindingDemo from './demos/two-way-binding.vue'
import ValueMappingDemo from './demos/value-mapping.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="picker">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="single-picker">
    <app-type>{{ english ? 'single picker' : 'single picker' }}</app-type>
    <SinglePickerDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="selection-modes-and-options">
    <span lang="zh-CN">选择模式与选项</span>
    <span lang="en-US">Selection modes and options</span>
  </h2>

  <section data-demo="multiple-picker">
    <app-type>{{ english ? 'multiple picker' : 'multiple picker' }}</app-type>
    <MultiplePickerDemo />
  </section>

  <section data-demo="cascade-picker">
    <app-type>{{ english ? 'cascade picker' : 'cascade picker' }}</app-type>
    <CascadePickerDemo />
  </section>

  <section data-demo="area-picker">
    <app-type>{{ english ? 'area picker' : 'area picker' }}</app-type>
    <AreaPickerDemo />
  </section>

  <section data-demo="columns-count">
    <app-type>{{ english ? 'columns count' : 'columns count' }}</app-type>
    <ColumnsCountDemo />
  </section>

  <section data-demo="value-mapping">
    <app-type>{{ english ? 'value mapping' : 'value mapping' }}</app-type>
    <ValueMappingDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-invocation">
    <span lang="zh-CN">交互与调用方式</span>
    <span lang="en-US">Interaction and invocation</span>
  </h2>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled picker' : '禁用选择器' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="two-way-binding">
    <app-type>{{ english ? 'two way binding' : 'two way binding' }}</app-type>
    <TwoWayBindingDemo />
  </section>

  <section data-demo="function-call">
    <app-type>{{ english ? 'function call' : 'function call' }}</app-type>
    <FunctionCallDemo />
  </section>
</template>
