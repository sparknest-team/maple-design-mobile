<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AmPmDemo from './demos/ampm.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import BoundsDemo from './demos/bounds.vue'
import ClockPresentationDemo from './demos/clock-presentation.vue'
import DefaultStateDemo from './demos/default-state.vue'
import DisabledDemo from './demos/disabled.vue'
import EnAmPmDemo from './demos/en-US/ampm.vue'
import EnBasicUsageDemo from './demos/en-US/basic-usage.vue'
import EnBoundsDemo from './demos/en-US/bounds.vue'
import EnClockPresentationDemo from './demos/en-US/clock-presentation.vue'
import EnDefaultStateDemo from './demos/en-US/default-state.vue'
import EnDisabledDemo from './demos/en-US/disabled.vue'
import EnFieldAppearanceDemo from './demos/en-US/field-appearance.vue'
import EnFormatModelDemo from './demos/en-US/format-model.vue'
import EnHour24Demo from './demos/en-US/hour24.vue'
import EnMultipleFieldsDemo from './demos/en-US/multiple-fields.vue'
import EnPanelBehaviorDemo from './demos/en-US/panel-behavior.vue'
import EnPickerActionsDemo from './demos/en-US/picker-actions.vue'
import EnPickerBasicDemo from './demos/en-US/picker-basic.vue'
import EnPickerClockDemo from './demos/en-US/picker-clock.vue'
import EnPickerHour24Demo from './demos/en-US/picker-hour24.vue'
import EnPickerLimitDemo from './demos/en-US/picker-limit.vue'
import EnPickerReadonlyDemo from './demos/en-US/picker-readonly.vue'
import EnPickerSecondsDemo from './demos/en-US/picker-seconds.vue'
import EnReadonlyDemo from './demos/en-US/readonly.vue'
import EnSelectionEventsDemo from './demos/en-US/selection-events.vue'
import EnShowSecondDemo from './demos/en-US/show-second.vue'
import EnStepDemo from './demos/en-US/step.vue'
import EnWheelLimitsDemo from './demos/en-US/wheel-limits.vue'
import EnWithFormItemDemo from './demos/en-US/with-form-item.vue'
import FieldAppearanceDemo from './demos/field-appearance.vue'
import FormatModelDemo from './demos/format-model.vue'
import Hour24Demo from './demos/hour24.vue'
import MultipleFieldsDemo from './demos/multiple-fields.vue'
import PanelBehaviorDemo from './demos/panel-behavior.vue'
import PickerActionsDemo from './demos/picker-actions.vue'
import PickerBasicDemo from './demos/picker-basic.vue'
import PickerClockDemo from './demos/picker-clock.vue'
import PickerHour24Demo from './demos/picker-hour24.vue'
import PickerLimitDemo from './demos/picker-limit.vue'
import PickerReadonlyDemo from './demos/picker-readonly.vue'
import PickerSecondsDemo from './demos/picker-seconds.vue'
import ReadonlyDemo from './demos/readonly.vue'
import SelectionEventsDemo from './demos/selection-events.vue'
import ShowSecondDemo from './demos/show-second.vue'
import StepDemo from './demos/step.vue'
import WheelLimitsDemo from './demos/wheel-limits.vue'
import WithFormItemDemo from './demos/with-form-item.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="field-appearance">
    <app-type>{{ english ? 'Field appearance' : '字段外壳与错误状态' }}</app-type>
    <EnFieldAppearanceDemo v-if="english" />
    <FieldAppearanceDemo v-else />
  </section>
  <section data-demo="bounds">
    <app-type>{{ english ? 'Inclusive time bounds' : '包含端点的时间边界' }}</app-type>
    <EnBoundsDemo v-if="english" />
    <BoundsDemo v-else />
  </section>
  <section data-demo="panel-behavior">
    <app-type>{{ english ? 'Panel confirmation and disabled options' : '纯面板确认与禁用选项' }}</app-type>
    <EnPanelBehaviorDemo v-if="english" />
    <PanelBehaviorDemo v-else />
  </section>
  <section data-demo="selection-events">
    <app-type>{{ english ? 'Selection and commit' : '选择与提交' }}</app-type>
    <EnSelectionEventsDemo v-if="english" />
    <SelectionEventsDemo v-else />
  </section>
  <section data-demo="default-state">
    <app-type>{{ english ? 'Default and controlled values' : '默认值与受控值' }}</app-type>
    <EnDefaultStateDemo v-if="english" />
    <DefaultStateDemo v-else />
  </section>
  <section data-demo="format-model">
    <app-type>{{ english ? 'Model types and literals' : '模型类型与固定文字' }}</app-type>
    <EnFormatModelDemo v-if="english" />
    <FormatModelDemo v-else />
  </section>
  <section data-demo="ampm">
    <app-type>{{ english ? 'AM/PM' : 'AM/PM 与午夜/中午' }}</app-type>
    <EnAmPmDemo v-if="english" />
    <AmPmDemo v-else />
  </section>
  <section data-demo="step">
    <app-type>{{ english ? 'Step intervals' : '时分秒步长' }}</app-type>
    <EnStepDemo v-if="english" />
    <StepDemo v-else />
  </section>
  <section data-demo="multiple-fields">
    <app-type>{{ english ? 'Multiple fields' : '多个独立字段' }}</app-type>
    <EnMultipleFieldsDemo v-if="english" />
    <MultipleFieldsDemo v-else />
  </section>

  <section data-demo="wheel-limits">
    <app-type>{{ english ? 'Wheel constraints' : '滚轮约束与动态禁用' }}</app-type>
    <EnWheelLimitsDemo v-if="english" />
    <WheelLimitsDemo v-else />
  </section>

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
