<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import ClockPresentationDemo from './demos/clock-presentation.vue'
import DisabledDemo from './demos/disabled.vue'
import EnBasicUsageDemo from './demos/en-US/basic-usage.vue'
import EnClockPresentationDemo from './demos/en-US/clock-presentation.vue'
import EnDisabledDemo from './demos/en-US/disabled.vue'
import EnHour24Demo from './demos/en-US/hour24.vue'
import EnPickerActionsDemo from './demos/en-US/picker-actions.vue'
import EnPickerBasicDemo from './demos/en-US/picker-basic.vue'
import EnPickerClockDemo from './demos/en-US/picker-clock.vue'
import EnPickerHour24Demo from './demos/en-US/picker-hour24.vue'
import EnPickerLimitDemo from './demos/en-US/picker-limit.vue'
import EnPickerReadonlyDemo from './demos/en-US/picker-readonly.vue'
import EnPickerSecondsDemo from './demos/en-US/picker-seconds.vue'
import EnReadonlyDemo from './demos/en-US/readonly.vue'
import EnShowSecondDemo from './demos/en-US/show-second.vue'
import EnWithFormItemDemo from './demos/en-US/with-form-item.vue'
import Hour24Demo from './demos/hour24.vue'
import PickerActionsDemo from './demos/picker-actions.vue'
import PickerBasicDemo from './demos/picker-basic.vue'
import PickerClockDemo from './demos/picker-clock.vue'
import PickerHour24Demo from './demos/picker-hour24.vue'
import PickerLimitDemo from './demos/picker-limit.vue'
import PickerReadonlyDemo from './demos/picker-readonly.vue'
import PickerSecondsDemo from './demos/picker-seconds.vue'
import ReadonlyDemo from './demos/readonly.vue'
import ShowSecondDemo from './demos/show-second.vue'
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

  <section data-demo="hour24">
    <app-type>{{ english ? '24-Hour Format' : '24 小时制' }}</app-type>
    <EnHour24Demo v-if="english" />
    <Hour24Demo v-else />
  </section>

  <section data-demo="show-second">
    <app-type>{{ english ? 'Show Seconds' : '显示秒' }}</app-type>
    <EnShowSecondDemo v-if="english" />
    <ShowSecondDemo v-else />
  </section>

  <section data-demo="clock-presentation">
    <app-type>{{ english ? 'Clock Presentation' : '时钟选择器' }}</app-type>
    <EnClockPresentationDemo v-if="english" />
    <ClockPresentationDemo v-else />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <EnDisabledDemo v-if="english" />
    <DisabledDemo v-else />
  </section>

  <section data-demo="readonly">
    <app-type>{{ english ? 'Readonly' : '只读' }}</app-type>
    <EnReadonlyDemo v-if="english" />
    <ReadonlyDemo v-else />
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

  <section data-demo="picker-clock">
    <app-type>{{ english ? 'Clock Mode' : '时钟模式' }}</app-type>
    <EnPickerClockDemo v-if="english" />
    <PickerClockDemo v-else />
  </section>

  <section data-demo="picker-hour24">
    <app-type>{{ english ? '24hr Format' : '24小时格式' }}</app-type>
    <EnPickerHour24Demo v-if="english" />
    <PickerHour24Demo v-else />
  </section>

  <section data-demo="picker-seconds">
    <app-type>{{ english ? 'Show Seconds' : '显示秒' }}</app-type>
    <EnPickerSecondsDemo v-if="english" />
    <PickerSecondsDemo v-else />
  </section>

  <section data-demo="picker-readonly">
    <app-type>{{ english ? 'Readonly' : '只读' }}</app-type>
    <EnPickerReadonlyDemo v-if="english" />
    <PickerReadonlyDemo v-else />
  </section>

  <section data-demo="picker-limit">
    <app-type>{{ english ? 'Time Limit' : '时间限制' }}</app-type>
    <EnPickerLimitDemo v-if="english" />
    <PickerLimitDemo v-else />
  </section>

  <section data-demo="picker-actions">
    <app-type>{{ english ? 'Actions Slots' : '操作栏' }}</app-type>
    <EnPickerActionsDemo v-if="english" />
    <PickerActionsDemo v-else />
  </section>
</template>
