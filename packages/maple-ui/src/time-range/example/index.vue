<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AmPmDemo from './demos/ampm.vue'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import BoundsDemo from './demos/bounds.vue'
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
import EnTextEntryDemo from './demos/en-US/text-entry.vue'
import EnWheelLimitsDemo from './demos/en-US/wheel-limits.vue'
import FieldAppearanceDemo from './demos/field-appearance.vue'
import FormatModelDemo from './demos/format-model.vue'
import Hour24Demo from './demos/hour24.vue'
import NextDayDemo from './demos/next-day.vue'
import PanelBehaviorDemo from './demos/panel-behavior.vue'
import PickerSecondsDemo from './demos/picker-seconds.vue'
import SelectionEventsDemo from './demos/selection-events.vue'
import SeparatorDemo from './demos/separator.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import StepDemo from './demos/step.vue'
import TextEntryDemo from './demos/text-entry.vue'
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
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>
  <section data-demo="disabled">
    <app-type>{{ english ? 'disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>
  <section data-demo="text-entry">
    <app-type>{{ english ? 'Text entry' : '手输与面板选择' }}</app-type>
    <EnTextEntryDemo v-if="english" />
    <TextEntryDemo v-else />
  </section>
  <section data-demo="picker-seconds">
    <app-type>{{ english ? 'picker seconds' : '列滚轮含秒' }}</app-type>
    <PickerSecondsDemo />
  </section>
  <section data-demo="hour24">
    <app-type>{{ english ? 'hour24' : '24 小时制与秒' }}</app-type>
    <Hour24Demo />
  </section>
  <section data-demo="separator">
    <app-type>{{ english ? 'separator' : '自定义分隔符' }}</app-type>
    <SeparatorDemo />
  </section>
  <section data-demo="next-day">
    <app-type>{{ english ? 'next day' : '次日标记' }}</app-type>
    <NextDayDemo />
  </section>
  <section data-demo="with-form-item">
    <app-type>{{ english ? 'With FormItem' : '搭配 FormItem' }}</app-type>
    <WithFormItemDemo />
  </section>
  <section data-demo="wheel-limits">
    <app-type>{{ english ? 'Wheel constraints' : '滚轮约束与动态禁用' }}</app-type>
    <EnWheelLimitsDemo v-if="english" />
    <WheelLimitsDemo v-else />
  </section>

  <section data-demo="ampm">
    <app-type>{{ english ? 'AM/PM and midnight/noon' : 'AM/PM 与午夜/中午' }}</app-type>
    <EnAmPmDemo v-if="english" />
    <AmPmDemo v-else />
  </section>

  <section data-demo="step">
    <app-type>{{ english ? 'Hour/minute/second steps' : '时分秒步长' }}</app-type>
    <EnStepDemo v-if="english" />
    <StepDemo v-else />
  </section>

  <section data-demo="format-model">
    <app-type>{{ english ? 'Model types and literals' : '模型类型与固定文字' }}</app-type>
    <EnFormatModelDemo v-if="english" />
    <FormatModelDemo v-else />
  </section>

  <section data-demo="default-state">
    <app-type>{{ english ? 'Default and controlled values' : '默认值与受控值' }}</app-type>
    <EnDefaultStateDemo v-if="english" />
    <DefaultStateDemo v-else />
  </section>

  <section data-demo="selection-events">
    <app-type>{{ english ? 'Selection and commit' : '选择与提交' }}</app-type>
    <EnSelectionEventsDemo v-if="english" />
    <SelectionEventsDemo v-else />
  </section>

  <section data-demo="panel-behavior">
    <app-type>{{ english ? 'Panel confirmation and disabled options' : '纯面板确认与禁用选项' }}</app-type>
    <EnPanelBehaviorDemo v-if="english" />
    <PanelBehaviorDemo v-else />
  </section>

  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>

  <section data-demo="field-appearance">
    <app-type>{{ english ? 'Field appearance and nested options' : '字段外壳与配置边界' }}</app-type>
    <EnFieldAppearanceDemo v-if="english" />
    <FieldAppearanceDemo v-else />
  </section>
  <section data-demo="bounds">
    <app-type>{{ english ? 'Time bounds' : '时间上下限' }}</app-type>
    <EnBoundsDemo v-if="english" />
    <BoundsDemo v-else />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
