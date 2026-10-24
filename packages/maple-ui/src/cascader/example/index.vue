<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import AsyncDevicesDemo from './demos/async-devices.vue'
import AsyncDevicesEnglishDemo from './demos/en-US/async-devices.vue'
import OrganizedPanelReview from './demos/panel-review.vue'
import PlaceholderListMultipleDemo from './demos/placeholder-list-multiple.vue'
import PlaceholderListDemo from './demos/placeholder-list.vue'
import PlaceholderMultipleDemo from './demos/placeholder-multiple.vue'
import PlaceholderPathModeDemo from './demos/placeholder-path-mode.vue'
import PlaceholderPickerMultipleDemo from './demos/placeholder-picker-multiple.vue'
import PlaceholderPickerDemo from './demos/placeholder-picker.vue'
import PlaceholderDemo from './demos/placeholder.vue'
import OrganizedStateLab from './demos/state-lab.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
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
  <section data-demo="control-sizes">
    <app-type>{{ english ? 'Form control size comparison' : '表单控件尺寸对照' }}</app-type
    ><ControlSizes />
  </section>

  <section data-demo="placeholder-picker">
    <app-type>{{ english ? 'Picker mode' : 'Dialog 模式' }}</app-type>
    <PlaceholderPickerDemo />
  </section>

  <section data-demo="placeholder-picker-multiple">
    <app-type>{{ english ? 'Picker multiple' : 'Dialog 多选' }}</app-type>
    <PlaceholderPickerMultipleDemo />
  </section>

  <section data-demo="placeholder-list">
    <app-type>{{ english ? 'List mode' : 'Popup 模式' }}</app-type>
    <PlaceholderListDemo />
  </section>

  <section data-demo="placeholder-list-multiple">
    <app-type>{{ english ? 'List multiple' : 'Popup 多选' }}</app-type>
    <PlaceholderListMultipleDemo />
  </section>

  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>
  <section data-demo="async-devices">
    <app-type>{{ english ? 'Async device labels' : '异步设备与 ID 回显' }}</app-type>
    <AsyncDevicesEnglishDemo v-if="english" />
    <AsyncDevicesDemo v-else />
  </section>
  <section data-demo="panel-review">
    <app-type>{{ english ? 'panel-review' : '子面板组合审查' }}</app-type>
    <OrganizedPanelReview />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
