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
import EnPickerBasicDemo from './demos/en-US/picker-basic.vue'
import EnPickerCalendarDemo from './demos/en-US/picker-calendar.vue'
import EnPickerDateTimeDemo from './demos/en-US/picker-date-time.vue'
import EnPickerReadonlyDemo from './demos/en-US/picker-readonly.vue'
import EnPickerTypeDemo from './demos/en-US/picker-type.vue'
import EnSeparatorDemo from './demos/en-US/separator.vue'
import EnTypeDemo from './demos/en-US/type.vue'
import EnWithFormItemDemo from './demos/en-US/with-form-item.vue'
import PickerBasicDemo from './demos/picker-basic.vue'
import PickerCalendarDemo from './demos/picker-calendar.vue'
import PickerDateTimeDemo from './demos/picker-date-time.vue'
import PickerReadonlyDemo from './demos/picker-readonly.vue'
import PickerTypeDemo from './demos/picker-type.vue'
import SeparatorDemo from './demos/separator.vue'
import TypeDemo from './demos/type.vue'
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

  <section data-demo="calendar-mode">
    <app-type>{{ english ? 'Calendar Mode' : '日历模式' }}</app-type>
    <EnCalendarModeDemo v-if="english" />
    <CalendarModeDemo v-else />
  </section>

  <section data-demo="date-time">
    <app-type>{{ english ? 'Date Time' : '日期时间' }}</app-type>
    <EnDateTimeDemo v-if="english" />
    <DateTimeDemo v-else />
  </section>

  <section data-demo="type">
    <app-type>{{ english ? 'Type' : '选择类型' }}</app-type>
    <EnTypeDemo v-if="english" />
    <TypeDemo v-else />
  </section>

  <section data-demo="separator">
    <app-type>{{ english ? 'Custom Separator' : '自定义分隔符' }}</app-type>
    <EnSeparatorDemo v-if="english" />
    <SeparatorDemo v-else />
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

  <section data-demo="picker-readonly">
    <app-type>{{ english ? 'Readonly' : '只读' }}</app-type>
    <EnPickerReadonlyDemo v-if="english" />
    <PickerReadonlyDemo v-else />
  </section>
</template>
