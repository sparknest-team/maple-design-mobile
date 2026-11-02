<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import AmPmFormatsDemo from './demos/ampm-formats.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import BoundsDemo from './demos/bounds.vue'
import DefaultStateDemo from './demos/default-state.vue'
import EnAmPmFormatsDemo from './demos/en-US/ampm-formats.vue'
import EnBasicUsageDemo from './demos/en-US/basic-usage.vue'
import EnBoundsDemo from './demos/en-US/bounds.vue'
import EnDefaultStateDemo from './demos/en-US/default-state.vue'
import EnFieldAppearanceDemo from './demos/en-US/field-appearance.vue'
import ContentFormatComparisonEn from './demos/en-US/format-comparison.vue'
import EnFormatModelDemo from './demos/en-US/format-model.vue'
import EnMultipleFieldsDemo from './demos/en-US/multiple-fields.vue'
import EnPanelBehaviorDemo from './demos/en-US/panel-behavior.vue'
import EnPickerActionsDemo from './demos/en-US/picker-actions.vue'
import EnPickerBasicDemo from './demos/en-US/picker-basic.vue'
import EnPickerHour24Demo from './demos/en-US/picker-hour24.vue'
import EnPickerLimitDemo from './demos/en-US/picker-limit.vue'
import EnPickerReadonlyDemo from './demos/en-US/picker-readonly.vue'
import EnPickerSecondsDemo from './demos/en-US/picker-seconds.vue'
import EnSelectionEventsDemo from './demos/en-US/selection-events.vue'
import EnStepDemo from './demos/en-US/step.vue'
import EnTextEntryDemo from './demos/en-US/text-entry.vue'
import EnWheelLimitsDemo from './demos/en-US/wheel-limits.vue'
import EnWithFormItemDemo from './demos/en-US/with-form-item.vue'
import FieldAppearanceDemo from './demos/field-appearance.vue'
import ContentFormatComparison from './demos/format-comparison.vue'
import FormatModelDemo from './demos/format-model.vue'
import MultipleFieldsDemo from './demos/multiple-fields.vue'
import GroupedOpenTriggerTargetDemo from './demos/open-trigger-target.vue'
import PanelBehaviorDemo from './demos/panel-behavior.vue'
import PickerActionsDemo from './demos/picker-actions.vue'
import PickerBasicDemo from './demos/picker-basic.vue'
import PickerHour24Demo from './demos/picker-hour24.vue'
import PickerLimitDemo from './demos/picker-limit.vue'
import PickerReadonlyDemo from './demos/picker-readonly.vue'
import PickerSecondsDemo from './demos/picker-seconds.vue'
import SelectionEventsDemo from './demos/selection-events.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import StepDemo from './demos/step.vue'
import TextEntryDemo from './demos/text-entry.vue'
import PickerFieldsDemo from './demos/time-fields.vue'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="time">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <EnBasicUsageDemo v-if="english" />
    <BasicUsageDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-presentation">
    <span lang="zh-CN">外观与展示</span>
    <span lang="en-US">Appearance and presentation</span>
  </h2>

  <section data-demo="control-sizes">
    <h3>Form controls / 表单控件尺寸对照</h3>
    <ControlSizes />
  </section>

  <section data-demo="field-appearance">
    <app-type>{{ english ? 'Field appearance and nested options' : '字段外壳与配置边界' }}</app-type>
    <EnFieldAppearanceDemo v-if="english" />
    <FieldAppearanceDemo v-else />
  </section>

  <section data-demo="format-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">时间格式与十二小时制</span><span lang="en-US">Time formats and 12-hour clocks</span>
    </h3>
    <component :is="english ? ContentFormatComparisonEn : ContentFormatComparison" />
  </section>

  <section data-demo="time-fields">
    <app-type>{{ english ? 'Visible wheel fields' : '滚轮可见字段' }}</app-type>
    <PickerFieldsDemo :english="english" />
  </section>

  <section data-demo="ampm-formats">
    <app-type>{{ english ? 'ampm-formats' : 'AM / PM' }}</app-type>
    <EnAmPmFormatsDemo v-if="english" /><AmPmFormatsDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="value-model-and-selection-rules">
    <span lang="zh-CN">值模型与选择规则</span>
    <span lang="en-US">Value model and selection rules</span>
  </h2>

  <section data-demo="format-model">
    <app-type>{{ english ? 'Model types and literals' : '模型类型与固定文字' }}</app-type>
    <EnFormatModelDemo v-if="english" />
    <FormatModelDemo v-else />
  </section>

  <section data-demo="step">
    <app-type>{{ english ? 'Hour/minute/second steps' : '时分秒步长' }}</app-type>
    <EnStepDemo v-if="english" />
    <StepDemo v-else />
  </section>

  <section data-demo="bounds">
    <app-type>{{ english ? 'Time bounds' : '时间上下限' }}</app-type>
    <EnBoundsDemo v-if="english" />
    <BoundsDemo v-else />
  </section>

  <section data-demo="wheel-limits">
    <app-type>{{ english ? 'Wheel constraints' : '滚轮约束与动态禁用' }}</app-type>
    <EnWheelLimitsDemo v-if="english" />
    <WheelLimitsDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="standalone-time-panels">
    <span lang="zh-CN">独立时间面板</span>
    <span lang="en-US">Standalone time panels</span>
  </h2>

  <section data-demo="picker-basic">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <EnPickerBasicDemo v-if="english" />
    <PickerBasicDemo v-else />
  </section>

  <section data-demo="panel-behavior">
    <app-type>{{ english ? 'Panel confirmation and disabled options' : '纯面板确认与禁用选项' }}</app-type>
    <EnPanelBehaviorDemo v-if="english" />
    <PanelBehaviorDemo v-else />
  </section>

  <section data-demo="picker-readonly">
    <app-type>{{ english ? 'Readonly' : '只读' }}</app-type>
    <EnPickerReadonlyDemo v-if="english" />
    <PickerReadonlyDemo v-else />
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

  <h2 class="mobile-demo-group-heading" data-demo-group="input-and-state-control">
    <span lang="zh-CN">输入与状态控制</span>
    <span lang="en-US">Input and state control</span>
  </h2>

  <section data-demo="state-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">交互状态对比</span><span lang="en-US">Interaction state comparison</span>
    </h3>
    <OrganizedStateLab />
  </section>

  <section data-demo="text-entry">
    <app-type>{{ english ? 'Text entry' : '手输与面板选择' }}</app-type>
    <EnTextEntryDemo v-if="english" />
    <TextEntryDemo v-else />
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

  <section data-demo="multiple-fields">
    <app-type>{{ english ? 'Multiple independent fields' : '多个独立字段' }}</app-type>
    <EnMultipleFieldsDemo v-if="english" />
    <MultipleFieldsDemo v-else />
  </section>

  <section data-demo="with-form-item">
    <app-type>{{ english ? 'With FormItem' : '搭配 FormItem' }}</app-type>
    <EnWithFormItemDemo v-if="english" />
    <WithFormItemDemo v-else />
  </section>

  <section data-demo="open-trigger-target">
    <h3 class="app-type mobile-demo-case-heading">
      <span lang="zh-CN">复制与编辑</span><span lang="en-US">Copying and editing</span>
    </h3>
    <GroupedOpenTriggerTargetDemo />
  </section>
</template>
