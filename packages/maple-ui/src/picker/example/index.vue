<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
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
  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled picker' : '禁用选择器' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="function-call">
    <app-type>{{ english ? 'function call' : 'function call' }}</app-type>
    <FunctionCallDemo />
  </section>

  <section data-demo="single-picker">
    <app-type>{{ english ? 'single picker' : 'single picker' }}</app-type>
    <SinglePickerDemo />
  </section>

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

  <section data-demo="two-way-binding">
    <app-type>{{ english ? 'two way binding' : 'two way binding' }}</app-type>
    <TwoWayBindingDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
