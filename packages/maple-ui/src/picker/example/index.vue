<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AreaPickerDemo from './demos/area-picker.vue'
import CascadePickerDemo from './demos/cascade-picker.vue'
import ColumnsCountDemo from './demos/columns-count.vue'
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
  <section data-demo="function-call">
    <app-type>{{ english ? 'Function Call' : '函数调用' }}</app-type>
    <FunctionCallDemo />
  </section>

  <section data-demo="single-picker">
    <app-type>{{ english ? 'Single Column Picker' : '单列选择' }}</app-type>
    <SinglePickerDemo />
  </section>

  <section data-demo="multiple-picker">
    <app-type>{{ english ? 'Multiple Column Picker' : '多列选择' }}</app-type>
    <MultiplePickerDemo />
  </section>

  <section data-demo="cascade-picker">
    <app-type>{{ english ? 'Cascade Column Picker' : '级联选择' }}</app-type>
    <CascadePickerDemo />
  </section>

  <section data-demo="area-picker">
    <app-type>{{ english ? 'Area Picker' : '地区选择' }}</app-type>
    <AreaPickerDemo />
  </section>

  <section data-demo="columns-count">
    <app-type>{{ english ? 'Columns Count' : '列数量' }}</app-type>
    <ColumnsCountDemo />
  </section>

  <section data-demo="value-mapping">
    <app-type>{{ english ? 'Value Mapping' : '值映射' }}</app-type>
    <ValueMappingDemo />
  </section>

  <section data-demo="two-way-binding">
    <app-type>{{ english ? 'Two-way binding' : '双向绑定' }}</app-type>
    <TwoWayBindingDemo />
  </section>
</template>
