<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AmPmDemo from './demos/ampm.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import BoundsDemo from './demos/bounds.vue'
import ClockModeDemo from './demos/clock-mode.vue'
import DefaultStateDemo from './demos/default-state.vue'
import DisabledDemo from './demos/disabled.vue'
import EnAmPmDemo from './demos/en-US/ampm.vue'
import EnBoundsDemo from './demos/en-US/bounds.vue'
import EnDefaultStateDemo from './demos/en-US/default-state.vue'
import EnFieldAppearanceDemo from './demos/en-US/field-appearance.vue'
import EnFormatModelDemo from './demos/en-US/format-model.vue'
import EnPanelBehaviorDemo from './demos/en-US/panel-behavior.vue'
import EnSelectionEventsDemo from './demos/en-US/selection-events.vue'
import EnStepDemo from './demos/en-US/step.vue'
import EnWheelLimitsDemo from './demos/en-US/wheel-limits.vue'
import FieldAppearanceDemo from './demos/field-appearance.vue'
import FormatModelDemo from './demos/format-model.vue'
import Hour24Demo from './demos/hour24.vue'
import NextDayDemo from './demos/next-day.vue'
import PanelBehaviorDemo from './demos/panel-behavior.vue'
import PickerSecondsDemo from './demos/picker-seconds.vue'
import SelectionEventsDemo from './demos/selection-events.vue'
import SeparatorDemo from './demos/separator.vue'
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

  <section data-demo="wheel-limits">
    <app-type>{{ english ? 'Wheel constraints' : '滚轮约束与动态禁用' }}</app-type>
    <EnWheelLimitsDemo v-if="english" />
    <WheelLimitsDemo v-else />
  </section>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="clock-mode">
    <app-type>{{ english ? 'Clock Mode' : '时钟模式' }}</app-type>
    <ClockModeDemo />
  </section>

  <section data-demo="picker-seconds">
    <app-type>{{ english ? 'Picker With Seconds' : '列滚轮含秒' }}</app-type>
    <PickerSecondsDemo />
  </section>

  <section data-demo="hour24">
    <app-type>{{ english ? '24hr And Seconds' : '24 小时制与秒' }}</app-type>
    <Hour24Demo />
  </section>

  <section data-demo="separator">
    <app-type>{{ english ? 'Custom Separator' : '自定义分隔符' }}</app-type>
    <SeparatorDemo />
  </section>

  <section data-demo="next-day">
    <app-type>{{ english ? 'Next Day Label' : '次日标记' }}</app-type>
    <NextDayDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="with-form-item">
    <app-type>{{ english ? 'With FormItem' : '搭配 FormItem' }}</app-type>
    <WithFormItemDemo />
  </section>
</template>
