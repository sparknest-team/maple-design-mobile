<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import ListDemo from './demos/list.vue'
import OutlineDemo from './demos/outline.vue'
import PickerDemo from './demos/picker.vue'
import StandardDemo from './demos/standard.vue'

onThemeChange()
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
</script>

<template>
  <section data-demo="standard">
    <app-type>{{ english ? 'Standard Variant' : '标准外观' }}</app-type>
    <StandardDemo />
  </section>

  <section data-demo="outline">
    <app-type>{{ english ? 'Outlined Variant' : '外边框外观' }}</app-type>
    <OutlineDemo />
  </section>

  <section data-demo="picker">
    <app-type>{{ english ? 'Picker Mode' : 'Picker 模式' }}</app-type>
    <PickerDemo />
  </section>

  <section data-demo="list">
    <app-type>{{ english ? 'List Mode' : 'List 模式' }}</app-type>
    <ListDemo />
  </section>
</template>
