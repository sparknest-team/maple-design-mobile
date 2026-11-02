<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import AsyncDevicesDemo from './demos/async-devices.vue'
import SearchMatchingDemo from './demos/case-sensitive.vue'
import AsyncDevicesEnglishDemo from './demos/en-US/async-devices.vue'
import LoadMoreDemo from './demos/load-more.vue'
import GroupedOpenTriggerTargetDemo from './demos/open-trigger-target.vue'
import OrganizedPanelReview from './demos/panel-review.vue'
import PassthroughOptionsDemo from './demos/passthrough-options.vue'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="cascader">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="placeholder">
    <app-type>{{ english ? 'Please select a region' : '请选择地区' }}</app-type>
    <PlaceholderDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>

  <section data-demo="control-sizes">
    <app-type>{{ english ? 'Form control size comparison' : '表单控件尺寸对照' }}</app-type
    ><ControlSizes />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="selection-modes-and-paths">
    <span lang="zh-CN">选择模式与路径</span>
    <span lang="en-US">Selection modes and paths</span>
  </h2>

  <section data-demo="placeholder-multiple">
    <app-type>{{ english ? 'Multiple cascade' : '级联多选' }}</app-type>
    <PlaceholderMultipleDemo />
  </section>

  <section data-demo="placeholder-picker-multiple">
    <app-type>{{ english ? 'Picker multiple' : 'Dialog 多选' }}</app-type>
    <PlaceholderPickerMultipleDemo />
  </section>

  <section data-demo="placeholder-list-multiple">
    <app-type>{{ english ? 'List multiple' : 'Popup 多选' }}</app-type>
    <PlaceholderListMultipleDemo />
  </section>

  <section data-demo="placeholder-path-mode">
    <app-type>{{ english ? 'Non-path mode' : '非路径模式' }}</app-type>
    <PlaceholderPathModeDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="search-and-presentation">
    <span lang="zh-CN">搜索与展示</span>
    <span lang="en-US">Search and presentation</span>
  </h2>

  <section data-demo="placeholder-list">
    <app-type>{{ english ? 'List mode' : 'Popup 模式' }}</app-type>
    <PlaceholderListDemo />
  </section>

  <section data-demo="case-sensitive">
    <app-type>搜索匹配规则 / Search matching</app-type>
    <SearchMatchingDemo />
  </section>

  <section data-demo="placeholder-picker">
    <app-type>{{ english ? 'Picker mode' : 'Dialog 模式' }}</app-type>
    <PlaceholderPickerDemo />
  </section>

  <section data-demo="panel-review">
    <app-type>{{ english ? 'panel-review' : '子面板组合审查' }}</app-type>
    <OrganizedPanelReview />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="configuration-and-composition">
    <span lang="zh-CN">配置与组合</span>
    <span lang="en-US">Configuration and composition</span>
  </h2>

  <section data-demo="passthrough-options"><app-type>透传配置边界</app-type><PassthroughOptionsDemo /></section>

  <section data-demo="open-trigger-target">
    <h3 class="app-type mobile-demo-case-heading">
      <span lang="zh-CN">复制与编辑</span><span lang="en-US">Copying and editing</span>
    </h3>
    <GroupedOpenTriggerTargetDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-loading-and-value-resolution">
    <span lang="zh-CN">异步加载与回显</span>
    <span lang="en-US">Async loading and value resolution</span>
  </h2>

  <section data-demo="load-more">
    <app-type>{{ english ? 'Callback lazy-loading and retry' : '回调懒加载与重试' }}</app-type>
    <LoadMoreDemo />
  </section>

  <section data-demo="async-devices">
    <app-type>{{ english ? 'Async device labels' : '异步设备与 ID 回显' }}</app-type>
    <AsyncDevicesEnglishDemo v-if="english" />
    <AsyncDevicesDemo v-else />
  </section>
</template>
