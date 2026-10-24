<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CalendarModeDemo from './demos/calendar-mode.vue'
import CurrentRangeDemo from './demos/current-range.vue'
import DateTimeDemo from './demos/date-time.vue'
import DisabledDemo from './demos/disabled.vue'
import EnBasicUsageDemo from './demos/en-US/basic-usage.vue'
import EnCalendarModeDemo from './demos/en-US/calendar-mode.vue'
import EnCurrentRangeDemo from './demos/en-US/current-range.vue'
import EnDateTimeDemo from './demos/en-US/date-time.vue'
import EnDisabledDemo from './demos/en-US/disabled.vue'
import EnEntryBoundaryDemo from './demos/en-US/entry-boundary.vue'
import EnFieldPanelToolsDemo from './demos/en-US/field-panel-tools.vue'
import EnFieldProtocolDemo from './demos/en-US/field-protocol.vue'
import EnLocaleIsolationDemo from './demos/en-US/locale-isolation.vue'
import EnMonthLabelsDemo from './demos/en-US/month-labels.vue'
import EnMultipleDemo from './demos/en-US/multiple.vue'
import EnPanelToolsDemo from './demos/en-US/panel-tools.vue'
import EnPickerBasicDemo from './demos/en-US/picker-basic.vue'
import EnPickerCalendarDemo from './demos/en-US/picker-calendar.vue'
import EnPickerDateTimeDemo from './demos/en-US/picker-date-time.vue'
import EnPickerLimitDemo from './demos/en-US/picker-limit.vue'
import EnPickerMonthDemo from './demos/en-US/picker-month.vue'
import EnPickerMultipleDemo from './demos/en-US/picker-multiple.vue'
import EnPickerRangeDemo from './demos/en-US/picker-range.vue'
import EnRejectedCloseDemo from './demos/en-US/rejected-close.vue'
import EnTextEntryDemo from './demos/en-US/text-entry.vue'
import EnTimePresentationDemo from './demos/en-US/time-presentation.vue'
import EnTypeDemo from './demos/en-US/type.vue'
import EnContractDemo from './demos/en-US/value-formats.vue'
import EnWithFormItemDemo from './demos/en-US/with-form-item.vue'
import EntryBoundaryDemo from './demos/entry-boundary.vue'
import FieldPanelToolsDemo from './demos/field-panel-tools.vue'
import FieldProtocolDemo from './demos/field-protocol.vue'
import LocaleIsolationDemo from './demos/locale-isolation.vue'
import MonthLabelsDemo from './demos/month-labels.vue'
import MultipleDemo from './demos/multiple.vue'
import PanelToolsDemo from './demos/panel-tools.vue'
import PickerBasicDemo from './demos/picker-basic.vue'
import PickerCalendarDemo from './demos/picker-calendar.vue'
import PickerDateTimeDemo from './demos/picker-date-time.vue'
import PickerLimitDemo from './demos/picker-limit.vue'
import PickerMonthDemo from './demos/picker-month.vue'
import PickerMultipleDemo from './demos/picker-multiple.vue'
import PickerRangeDemo from './demos/picker-range.vue'
import RejectedCloseDemo from './demos/rejected-close.vue'
import OrganizedResponsivePanels from './demos/responsive-panels.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import TextEntryDemo from './demos/text-entry.vue'
import TimePresentationDemo from './demos/time-presentation.vue'
import TypeDemo from './demos/type.vue'
import ContractDemo from './demos/value-formats.vue'
import WithFormItemDemo from './demos/with-form-item.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <EnBasicUsageDemo v-if="english" />
    <BasicUsageDemo v-else />
  </section>
  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <EnDisabledDemo v-if="english" />
    <DisabledDemo v-else />
  </section>
  <section data-demo="control-sizes">
    <h3>Form controls / 表单控件尺寸对照</h3>
    <ControlSizes />
  </section>
  <section data-demo="field-protocol">
    <app-type>{{ english ? 'Shared field and commit protocol' : '统一字段与提交' }}</app-type>
    <EnFieldProtocolDemo v-if="english" />
    <FieldProtocolDemo v-else />
  </section>
  <section data-demo="rejected-close">
    <app-type>{{ english ? 'Rejected controlled close' : '受控关闭被拒绝' }}</app-type>
    <EnRejectedCloseDemo v-if="english" /><RejectedCloseDemo v-else />
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
  <section data-demo="multiple">
    <app-type>{{ english ? 'Multiple' : '多选' }}</app-type>
    <EnMultipleDemo v-if="english" />
    <MultipleDemo v-else />
  </section>
  <section data-demo="date-time">
    <app-type>{{ english ? 'Date Time' : '日期时间' }}</app-type>
    <EnDateTimeDemo v-if="english" />
    <DateTimeDemo v-else />
  </section>
  <section data-demo="with-form-item">
    <app-type>{{ english ? 'With FormItem' : '搭配 FormItem' }}</app-type>
    <EnWithFormItemDemo v-if="english" />
    <WithFormItemDemo v-else />
  </section>

  <section data-demo="value-formats">
    <app-type>{{ english ? 'Model and display formats' : '模型格式与显示格式' }}</app-type>
    <EnContractDemo v-if="english" /><ContractDemo v-else />
  </section>

  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>

  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>

  <section data-demo="entry-boundary">
    <app-type>{{ english ? 'Field and embedded panel' : '字段与嵌入式面板' }}</app-type>
    <EnEntryBoundaryDemo v-if="english" /><EntryBoundaryDemo v-else />
  </section>

  <section data-demo="picker-basic">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <EnPickerBasicDemo v-if="english" />
    <PickerBasicDemo v-else />
  </section>

  <section data-demo="picker-calendar">
    <app-type>{{ english ? 'Calendar Mode' : '日历模式' }}</app-type>
    <EnPickerCalendarDemo v-if="english" />
    <PickerCalendarDemo v-else />
  </section>

  <section data-demo="picker-month">
    <app-type>{{ english ? 'Month Picker' : '月份选择器' }}</app-type>
    <EnPickerMonthDemo v-if="english" />
    <PickerMonthDemo v-else />
  </section>

  <section data-demo="picker-multiple">
    <app-type>{{ english ? 'Multiple' : '多选' }}</app-type>
    <EnPickerMultipleDemo v-if="english" />
    <PickerMultipleDemo v-else />
  </section>

  <section data-demo="picker-range">
    <app-type>{{ english ? 'Range' : '选择范围' }}</app-type>
    <EnPickerRangeDemo v-if="english" />
    <PickerRangeDemo v-else />
  </section>

  <section data-demo="picker-limit">
    <app-type>{{ english ? 'Date Limit' : '日期限制' }}</app-type>
    <EnPickerLimitDemo v-if="english" />
    <PickerLimitDemo v-else />
  </section>

  <section data-demo="picker-date-time">
    <app-type>{{ english ? 'Date Time' : '日期时间' }}</app-type>
    <EnPickerDateTimeDemo v-if="english" />
    <PickerDateTimeDemo v-else />
  </section>

  <section data-demo="panel-tools">
    <app-type>{{ english ? 'Shortcuts and calendar viewport' : '快捷选项与日历视口' }}</app-type>
    <EnPanelToolsDemo v-if="english" /><PanelToolsDemo v-else />
  </section>

  <section data-demo="current-range">
    <app-type>{{ english ? 'Current highlighting and selection' : '当前日期与范围策略' }}</app-type>
    <EnCurrentRangeDemo v-if="english" /><CurrentRangeDemo v-else />
  </section>
  <section data-demo="month-labels">
    <app-type>{{ english ? 'Current highlighting and selection' : '当前日期与范围策略' }}</app-type>
    <EnMonthLabelsDemo v-if="english" />
    <MonthLabelsDemo v-else />
  </section>
  <section data-demo="time-presentation">
    <app-type>{{ english ? 'Nested time and wheel views' : '内嵌时间与滚轮展示' }}</app-type>
    <EnTimePresentationDemo v-if="english" />
    <TimePresentationDemo v-else />
  </section>
  <section data-demo="locale-isolation">
    <app-type>{{ english ? 'Instance locale isolation' : '日期语言的实例隔离' }}</app-type>
    <EnLocaleIsolationDemo v-if="english" />
    <LocaleIsolationDemo v-else />
  </section>
  <section data-demo="text-entry">
    <app-type>{{ english ? 'Text entry and panel selection' : '手输与面板选择' }}</app-type>
    <EnTextEntryDemo v-if="english" /><TextEntryDemo v-else />
  </section>
  <section data-demo="field-panel-tools">
    <app-type>{{ english ? 'Field viewport and shortcut events' : '字段视口与快捷项事件' }}</app-type>
    <EnFieldPanelToolsDemo v-if="english" /><FieldPanelToolsDemo v-else />
  </section>
  <section data-demo="responsive-panels">
    <app-type>{{ english ? 'responsive-panels' : '独立面板窄屏与组合布局' }}</app-type>
    <OrganizedResponsivePanels />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
