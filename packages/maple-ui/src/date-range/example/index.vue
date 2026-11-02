<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import OrganizedResponsivePanels from './../../date/example/demos/responsive-panels.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ContractDemo from './demos/boundaries.vue'
import CalendarModeDemo from './demos/calendar-mode.vue'
import DateTimeDemo from './demos/date-time.vue'
import EnBasicUsageDemo from './demos/en-US/basic-usage.vue'
import EnContractDemo from './demos/en-US/boundaries.vue'
import EnCalendarModeDemo from './demos/en-US/calendar-mode.vue'
import EnDateTimeDemo from './demos/en-US/date-time.vue'
import EnEndpointLockDemo from './demos/en-US/endpoint-lock.vue'
import EnEntryBoundaryDemo from './demos/en-US/entry-boundary.vue'
import EnFieldPanelToolsDemo from './demos/en-US/field-panel-tools.vue'
import EnPickerBasicDemo from './demos/en-US/picker-basic.vue'
import EnPickerCalendarDemo from './demos/en-US/picker-calendar.vue'
import EnPickerDateTimeDemo from './demos/en-US/picker-date-time.vue'
import EnPickerReadonlyDemo from './demos/en-US/picker-readonly.vue'
import EnPickerTypeDemo from './demos/en-US/picker-type.vue'
import EnRejectedCloseDemo from './demos/en-US/rejected-close.vue'
import EnSeparatorDemo from './demos/en-US/separator.vue'
import EnTextEntryDemo from './demos/en-US/text-entry.vue'
import EnTypeDemo from './demos/en-US/type.vue'
import EnWithFormItemDemo from './demos/en-US/with-form-item.vue'
import EndpointLockDemo from './demos/endpoint-lock.vue'
import EntryBoundaryDemo from './demos/entry-boundary.vue'
import FieldPanelToolsDemo from './demos/field-panel-tools.vue'
import GroupedOpenTriggerTargetDemo from './demos/open-trigger-target.vue'
import PassthroughOptionsDemo from './demos/passthrough-options.vue'
import PickerBasicDemo from './demos/picker-basic.vue'
import PickerCalendarDemo from './demos/picker-calendar.vue'
import PickerDateTimeDemo from './demos/picker-date-time.vue'
import PickerReadonlyDemo from './demos/picker-readonly.vue'
import PickerTypeDemo from './demos/picker-type.vue'
import RejectedCloseDemo from './demos/rejected-close.vue'
import SeparatorDemo from './demos/separator.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import ReviewRequestedDemo from './demos/string-values.vue'
import TextEntryDemo from './demos/text-entry.vue'
import TypeDemo from './demos/type.vue'
import WithFormItemDemo from './demos/with-form-item.vue'
import NewDateScenarios from './demos/zoned-range.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="date-range">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <EnBasicUsageDemo v-if="english" />
    <BasicUsageDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-date-presentation">
    <span lang="zh-CN">外观与日期展示</span>
    <span lang="en-US">Appearance and date presentation</span>
  </h2>

  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>

  <section data-demo="separator">
    <app-type>{{ english ? 'Custom Separator' : '自定义分隔符' }}</app-type>
    <EnSeparatorDemo v-if="english" />
    <SeparatorDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="time-and-range-rules">
    <span lang="zh-CN">时间与范围规则</span>
    <span lang="en-US">Time and range rules</span>
  </h2>

  <section data-demo="boundaries">
    <app-type>{{ english ? 'Bounds and endpoint rules' : '边界和端点禁用' }}</app-type>
    <EnContractDemo v-if="english" /><ContractDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="value-model-and-text-input">
    <span lang="zh-CN">值模型与输入</span>
    <span lang="en-US">Value model and text input</span>
  </h2>

  <section data-demo="string-values"><ReviewRequestedDemo /></section>

  <section data-demo="text-entry">
    <app-type>{{ english ? 'Text entry and panel selection' : '手输与面板选择' }}</app-type>
    <EnTextEntryDemo v-if="english" /><TextEntryDemo v-else />
  </section>

  <section data-demo="date-time">
    <app-type>{{ english ? 'Date Time' : '日期时间' }}</app-type>
    <EnDateTimeDemo v-if="english" />
    <DateTimeDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="zoned-range">
    <app-type>{{ english ? 'Cross-month, DST and endpoint locks' : '跨月、夏令时与端点锁定' }}</app-type>
    <NewDateScenarios :english="english" />
  </section>

  <section data-demo="calendar-mode">
    <app-type>{{ english ? 'Calendar Mode' : '日历模式' }}</app-type>
    <EnCalendarModeDemo v-if="english" />
    <CalendarModeDemo v-else />
  </section>

  <section data-demo="type">
    <app-type>{{ english ? 'Type' : '选择类型' }}</app-type>
    <EnTypeDemo v-if="english" />
    <TypeDemo v-else />
  </section>

  <section data-demo="with-form-item">
    <app-type>{{ english ? 'With FormItem' : '搭配 FormItem' }}</app-type>
    <EnWithFormItemDemo v-if="english" />
    <WithFormItemDemo v-else />
  </section>

  <section data-demo="endpoint-lock">
    <app-type>{{ english ? 'Endpoint locks' : '端点锁定' }}</app-type>
    <EnEndpointLockDemo v-if="english" /><EndpointLockDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="responsive-panels">
    <app-type>{{ english ? 'responsive-panels' : '独立面板窄屏与组合布局' }}</app-type>
    <OrganizedResponsivePanels />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="standalone-date-panels">
    <span lang="zh-CN">独立日期面板</span>
    <span lang="en-US">Standalone date panels</span>
  </h2>

  <section data-demo="picker-basic">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <EnPickerBasicDemo v-if="english" />
    <PickerBasicDemo v-else />
  </section>

  <section data-demo="picker-readonly">
    <app-type>{{ english ? 'Readonly' : '只读' }}</app-type>
    <EnPickerReadonlyDemo v-if="english" />
    <PickerReadonlyDemo v-else />
  </section>

  <section data-demo="picker-calendar">
    <app-type>{{ english ? 'Calendar Mode' : '日历模式' }}</app-type>
    <EnPickerCalendarDemo v-if="english" />
    <PickerCalendarDemo v-else />
  </section>

  <section data-demo="picker-date-time">
    <app-type>{{ english ? 'Date Time Range' : '日期时间范围' }}</app-type>
    <EnPickerDateTimeDemo v-if="english" />
    <PickerDateTimeDemo v-else />
  </section>

  <section data-demo="picker-type">
    <app-type>{{ english ? 'Year / Month Range' : '年 / 月范围' }}</app-type>
    <EnPickerTypeDemo v-if="english" />
    <PickerTypeDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-field-configuration">
    <span lang="zh-CN">交互与字段配置</span>
    <span lang="en-US">Interaction and field configuration</span>
  </h2>

  <section data-demo="state-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">交互状态对比</span><span lang="en-US">Interaction state comparison</span>
    </h3>
    <OrganizedStateLab />
  </section>

  <section data-demo="rejected-close">
    <app-type>{{ english ? 'Rejected controlled close' : '受控关闭被拒绝' }}</app-type>
    <EnRejectedCloseDemo v-if="english" /><RejectedCloseDemo v-else />
  </section>

  <section data-demo="field-panel-tools">
    <app-type>{{ english ? 'Field viewport and shortcut events' : '字段视口与快捷项事件' }}</app-type>
    <EnFieldPanelToolsDemo v-if="english" /><FieldPanelToolsDemo v-else />
  </section>

  <section data-demo="entry-boundary">
    <app-type>{{ english ? 'Field and embedded panel' : '字段与嵌入式面板' }}</app-type>
    <EnEntryBoundaryDemo v-if="english" /><EntryBoundaryDemo v-else />
  </section>

  <section data-demo="passthrough-options"><app-type>透传配置边界</app-type><PassthroughOptionsDemo /></section>

  <section data-demo="open-trigger-target">
    <h3 class="app-type mobile-demo-case-heading">
      <span lang="zh-CN">复制与编辑</span><span lang="en-US">Copying and editing</span>
    </h3>
    <GroupedOpenTriggerTargetDemo />
  </section>
</template>
