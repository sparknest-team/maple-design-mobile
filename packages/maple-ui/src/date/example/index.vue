<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import CalendarModeDemo from './demos/calendar-mode.vue'
import DateTimeDemo from './demos/date-time.vue'
import DisabledDemo from './demos/disabled.vue'
import EnBasicUsageDemo from './demos/en-US/basic-usage.vue'
import EnCalendarModeDemo from './demos/en-US/calendar-mode.vue'
import EnDateTimeDemo from './demos/en-US/date-time.vue'
import EnDisabledDemo from './demos/en-US/disabled.vue'
import EnFieldProtocolDemo from './demos/en-US/field-protocol.vue'
import EnMultipleDemo from './demos/en-US/multiple.vue'
import EnPickerBasicDemo from './demos/en-US/picker-basic.vue'
import EnPickerCalendarDemo from './demos/en-US/picker-calendar.vue'
import EnPickerDateTimeDemo from './demos/en-US/picker-date-time.vue'
import EnPickerLimitDemo from './demos/en-US/picker-limit.vue'
import EnPickerMonthDemo from './demos/en-US/picker-month.vue'
import EnPickerMultipleDemo from './demos/en-US/picker-multiple.vue'
import EnPickerRangeDemo from './demos/en-US/picker-range.vue'
import EnTypeDemo from './demos/en-US/type.vue'
import EnContractDemo from './demos/en-US/value-formats.vue'
import EnWithFormItemDemo from './demos/en-US/with-form-item.vue'
import FieldProtocolDemo from './demos/field-protocol.vue'
import MultipleDemo from './demos/multiple.vue'
import PickerBasicDemo from './demos/picker-basic.vue'
import PickerCalendarDemo from './demos/picker-calendar.vue'
import PickerDateTimeDemo from './demos/picker-date-time.vue'
import PickerLimitDemo from './demos/picker-limit.vue'
import PickerMonthDemo from './demos/picker-month.vue'
import PickerMultipleDemo from './demos/picker-multiple.vue'
import PickerRangeDemo from './demos/picker-range.vue'
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
  <section data-demo="value-formats">
    <app-type>{{ english ? 'Model and display formats' : '模型格式与显示格式' }}</app-type>
    <EnContractDemo v-if="english" /><ContractDemo v-else />
  </section>
  <section data-demo="field-protocol">
    <app-type>{{ english ? 'Shared field and commit protocol' : '统一字段与提交' }}</app-type>
    <EnFieldProtocolDemo v-if="english" />
    <FieldProtocolDemo v-else />
  </section>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <EnBasicUsageDemo v-if="english" />
    <BasicUsageDemo v-else />
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

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <EnDisabledDemo v-if="english" />
    <DisabledDemo v-else />
  </section>

  <section data-demo="with-form-item">
    <app-type>{{ english ? 'With FormItem' : '搭配 FormItem' }}</app-type>
    <EnWithFormItemDemo v-if="english" />
    <WithFormItemDemo v-else />
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
</template>
