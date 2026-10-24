<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import AsyncDevicesDemo from './demos/async-devices.vue'
import DemoClearable from './demos/clearable.vue'
import DemoCustomIcons from './demos/custom-icons.vue'
import DialogDemo from './demos/dialog.vue'
import AsyncDevicesEnglishDemo from './demos/en-US/async-devices.vue'
import DemoFieldNames from './demos/field-names.vue'
import GroupSpacingDemo from './demos/group-spacing.vue'
import DemoMultiple from './demos/multiple.vue'
import OptionsReviewDemo from './demos/options-review.vue'
import DemoOptions from './demos/options.vue'
import DemoOutline from './demos/outline.vue'
import PopupDemo from './demos/popup.vue'
import SameLabelDemo from './demos/same-label.vue'
import SchedulerLifecycleDemo from './demos/scheduler-lifecycle.vue'
import ScrollbarLifecycleDemo from './demos/scrollbar-lifecycle.vue'
import SelectionDataFlow from './demos/selection-data-flow.vue'
import DemoSize from './demos/size.vue'
import SlotsReviewDemo from './demos/slots-review.vue'
import DemoStandard from './demos/standard.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import DemoState from './demos/state.vue'
import ThumbLifecycleDemo from './demos/thumb-lifecycle.vue'
import DemoValueMapping from './demos/value-mapping.vue'

onThemeChange()
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
</script>

<template>
  <section data-demo="standard">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <DemoStandard />
  </section>
  <section data-demo="selection-data-flow">
    <app-type>{{ english ? 'Candidate highlighting and form data flow' : '候选高亮与表单数据流' }}</app-type>
    <SelectionDataFlow :english="english" />
  </section>
  <section data-demo="state">
    <app-type>{{ english ? 'Disabled and readonly' : '禁用与只读' }}</app-type>
    <DemoState />
  </section>
  <section data-demo="size">
    <app-type>{{ english ? 'Small size' : '小尺寸' }}</app-type>
    <DemoSize />
  </section>

  <section data-demo="control-sizes">
    <h3>Form controls / 表单控件尺寸对照</h3>
    <ControlSizes />
  </section>
  <section data-demo="outline">
    <app-type>{{ english ? 'Outlined variant' : '边框外观' }}</app-type>
    <DemoOutline />
  </section>
  <section data-demo="value-mapping">
    <app-type>{{ english ? 'Labels and values' : '标签与绑定值' }}</app-type>
    <DemoValueMapping />
  </section>
  <section data-demo="clearable">
    <app-type>{{ english ? 'Clearing' : '清除选择' }}</app-type>
    <DemoClearable />
  </section>
  <section data-demo="multiple">
    <app-type>{{ english ? 'Multiple selection' : '多选' }}</app-type>
    <DemoMultiple />
  </section>
  <section data-demo="options">
    <app-type>{{ english ? 'Option data' : '选项数据' }}</app-type>
    <DemoOptions />
  </section>
  <section data-demo="field-names">
    <app-type>{{ english ? 'Field mapping' : '字段映射' }}</app-type>
    <DemoFieldNames />
  </section>
  <section data-demo="custom-icons">
    <app-type>{{ english ? 'Custom icons' : '自定义图标' }}</app-type>
    <DemoCustomIcons />
  </section>
  <section data-demo="same-label">
    <app-type>{{ english ? 'Identical labels, distinct values' : '同名选项' }}</app-type>
    <SameLabelDemo />
  </section>
  <section data-demo="dialog">
    <app-type>{{ english ? 'Overlay presentations' : '弹层与阅读展示' }}</app-type>
    <DialogDemo />
  </section>

  <section data-demo="popup">
    <app-type>{{ english ? 'Overlay presentations' : '弹层与阅读展示' }}</app-type>
    <PopupDemo />
  </section>

  <section data-demo="group-spacing">
    <app-type>{{ english ? 'Group spacing' : '分组间距' }}</app-type>
    <GroupSpacingDemo />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>

  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>
  <section data-demo="async-devices">
    <app-type>{{ english ? 'Async device labels' : '异步设备与 ID 回显' }}</app-type>
    <AsyncDevicesEnglishDemo v-if="english" />
    <AsyncDevicesDemo v-else />
  </section>
  <section data-demo="thumb-lifecycle">
    <app-type>{{ english ? 'thumb-lifecycle' : 'Thumb drag lifecycle / 滑块拖动生命周期' }}</app-type>
    <ThumbLifecycleDemo />
  </section>
  <section data-demo="scrollbar-lifecycle">
    <app-type>{{ english ? 'scrollbar-lifecycle' : 'Scrollbar consumer lifecycle / 滚动条消费者生命周期' }}</app-type>
    <ScrollbarLifecycleDemo />
  </section>
  <section data-demo="slots-review">
    <app-type>{{ english ? 'slots-review' : '复杂插槽组合' }}</app-type>
    <SlotsReviewDemo />
  </section>
  <section data-demo="scheduler-lifecycle">
    <app-type>{{ english ? 'Interaction Scheduling Lifecycle' : '交互调度生命周期' }}</app-type>
    <SchedulerLifecycleDemo />
  </section>
  <section data-demo="options-review">
    <app-type>{{ english ? 'options-review' : '子组件选项与分组' }}</app-type>
    <OptionsReviewDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
