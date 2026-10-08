<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AsyncDevicesDemo from './demos/async-devices.vue'
import AsyncDevicesEnglishDemo from './demos/en-US/async-devices.vue'
import PlaceholderListMultipleDemo from './demos/placeholder-list-multiple.vue'
import PlaceholderListDemo from './demos/placeholder-list.vue'
import PlaceholderMultipleDemo from './demos/placeholder-multiple.vue'
import PlaceholderPathModeDemo from './demos/placeholder-path-mode.vue'
import PlaceholderPickerMultipleDemo from './demos/placeholder-picker-multiple.vue'
import PlaceholderPickerDemo from './demos/placeholder-picker.vue'
import PlaceholderDemo from './demos/placeholder.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="async-devices">
    <app-type>{{ english ? 'Async device labels' : '异步设备与 ID 回显' }}</app-type>
    <AsyncDevicesEnglishDemo v-if="english" />
    <AsyncDevicesDemo v-else />
  </section>
  <section data-demo="placeholder">
    <app-type>{{ english ? 'Please select a region' : '请选择地区' }}</app-type>
    <PlaceholderDemo />
  </section>

  <section data-demo="placeholder-path-mode">
    <app-type>{{ english ? 'Non-path mode' : '非路径模式' }}</app-type>
    <PlaceholderPathModeDemo />
  </section>

  <section data-demo="placeholder-multiple">
    <app-type>{{ english ? 'Multiple cascade' : '级联多选' }}</app-type>
    <PlaceholderMultipleDemo />
  </section>

  <section data-demo="placeholder-picker">
    <app-type>{{ english ? 'Picker mode' : 'Picker 模式' }}</app-type>
    <PlaceholderPickerDemo />
  </section>

  <section data-demo="placeholder-picker-multiple">
    <app-type>{{ english ? 'Picker multiple' : 'Picker 多选' }}</app-type>
    <PlaceholderPickerMultipleDemo />
  </section>

  <section data-demo="placeholder-list">
    <app-type>{{ english ? 'List mode' : 'List 模式' }}</app-type>
    <PlaceholderListDemo />
  </section>

  <section data-demo="placeholder-list-multiple">
    <app-type>{{ english ? 'List multiple' : 'List 多选' }}</app-type>
    <PlaceholderListMultipleDemo />
  </section>
</template>
